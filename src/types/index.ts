export type AgeCategory = 'kids' | 'teens' | 'adults' | 'masters';

export interface Question {
  id: string;
  category: AgeCategory;
  tier: number; // 1 to 10
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  biblicalReference: string;
  explanation: string;
  curiosity?: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email?: string;
  ageGroup: AgeCategory;
  avatarId: string;
  totalScore: number;
  gamesPlayed: number;
  millionWins: number;
  highestScore: number;
  level: string;
  unlockedAchievements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ScoreEntry {
  id?: string;
  userId: string;
  displayName: string;
  avatarId: string;
  score: number;
  category: AgeCategory;
  questionsAnswered: number;
  wonMillion: boolean;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (user: UserProfile, matchStats?: MatchStats) => boolean;
}

export interface MatchStats {
  score: number;
  questionsAnswered: number;
  wonMillion: boolean;
  skipsUsed: number;
  cardsUsed: boolean;
  guestsUsed: boolean;
  eldersUsed: boolean;
  category: AgeCategory;
}

export interface LadderStep {
  tier: number;
  rewardCorrect: number;
  rewardStop: number;
  rewardWrong: number;
}
