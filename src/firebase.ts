import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc,
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  getDocFromServer,
  Firestore
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';
import { UserProfile, ScoreEntry } from './types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Test Connection on boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Local persistence will be utilized.');
    }
    return false;
  }
}
testConnection();

// Safe Local Storage Fallbacks
const LOCAL_USER_KEY = 'quiz_biblico_user_profile';
const LOCAL_SCORES_KEY = 'quiz_biblico_cached_scores';

export function getLocalUserProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveLocalUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed saving local user profile', err);
  }
}

export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
  const path = `users/${uid}`;
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data() as UserProfile;
      saveLocalUserProfile(data);
      return data;
    }
    return getLocalUserProfile();
  } catch (err) {
    console.warn('Failed to fetch from firestore, using local profile', err);
    return getLocalUserProfile();
  }
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  saveLocalUserProfile(profile);
  if (!auth.currentUser || auth.currentUser.uid !== profile.id) {
    return;
  }
  const path = `users/${profile.id}`;
  try {
    await setDoc(doc(db, 'users', profile.id), profile);
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.WRITE, path);
    } catch {
      // Keep going with local state
    }
  }
}

export async function postScoreToLeaderboard(entry: ScoreEntry): Promise<void> {
  // Save locally first
  try {
    const cachedRaw = localStorage.getItem(LOCAL_SCORES_KEY);
    const cached: ScoreEntry[] = cachedRaw ? JSON.parse(cachedRaw) : [];
    cached.unshift(entry);
    localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(cached.slice(0, 50)));
  } catch {
    // Ignore storage issues
  }

  if (!auth.currentUser) return;
  const scoreId = `${entry.userId}_${Date.now()}`;
  const path = `scores/${scoreId}`;
  try {
    await setDoc(doc(db, 'scores', scoreId), entry);
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.CREATE, path);
    } catch {
      // Ignored for offline play
    }
  }
}

export async function fetchGlobalLeaderboard(category?: string): Promise<ScoreEntry[]> {
  try {
    const scoresRef = collection(db, 'scores');
    const q = query(scoresRef, orderBy('score', 'desc'), limit(30));
    const snapshot = await getDocs(q);
    const results: ScoreEntry[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as ScoreEntry;
      if (!category || data.category === category) {
        results.push({ ...data, id: docSnap.id });
      }
    });
    if (results.length > 0) {
      localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(results));
      return results;
    }
  } catch (err) {
    console.warn('Firestore leaderboard query failed, reading cache', err);
  }

  // Fallback to local storage
  try {
    const raw = localStorage.getItem(LOCAL_SCORES_KEY);
    const cached: ScoreEntry[] = raw ? JSON.parse(raw) : [];
    return category ? cached.filter(s => s.category === category) : cached;
  } catch {
    return [];
  }
}

export async function deleteScoreFromLeaderboard(scoreId: string): Promise<void> {
  // 1. Remove from local storage
  try {
    const raw = localStorage.getItem(LOCAL_SCORES_KEY);
    if (raw) {
      const cached: ScoreEntry[] = JSON.parse(raw);
      const filtered = cached.filter(s => s.id !== scoreId);
      localStorage.setItem(LOCAL_SCORES_KEY, JSON.stringify(filtered));
    }
  } catch {
    // Ignore
  }

  // 2. Remove from Firestore if user is auth
  if (auth.currentUser && scoreId) {
    const path = `scores/${scoreId}`;
    try {
      await deleteDoc(doc(db, 'scores', scoreId));
    } catch (error) {
      console.warn('Failed to delete score from Firestore', error);
    }
  }
}

export async function clearAllLeaderboardScores(userId?: string): Promise<void> {
  // Clear local storage
  try {
    localStorage.removeItem(LOCAL_SCORES_KEY);
  } catch {
    // Ignore
  }

  // If userId provided and user is authenticated, delete their scores in Firestore
  if (auth.currentUser && userId) {
    try {
      const scoresRef = collection(db, 'scores');
      const q = query(scoresRef, limit(50));
      const snapshot = await getDocs(q);
      const deletePromises: Promise<void>[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.userId === userId) {
          deletePromises.push(deleteDoc(docSnap.ref));
        }
      });
      await Promise.all(deletePromises);
    } catch (err) {
      console.warn('Error clearing user firestore scores', err);
    }
  }
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  type FirebaseUser
};
