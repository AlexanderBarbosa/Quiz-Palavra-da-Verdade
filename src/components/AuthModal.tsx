import React, { useState } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  saveUserProfile 
} from '../firebase';
import { UserProfile, AgeCategory } from '../types';
import { X, Lock, Mail, User, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  currentUser: UserProfile;
}

const AVATARS = ['🕊️', '👑', '🛡️', '📖', '🌟', '✝️', '🔥', '🦁', '🌿', '🐟'];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, currentUser }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatarId || '🕊️');
  const [selectedAge, setSelectedAge] = useState<AgeCategory>(currentUser.ageGroup || 'adults');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (mode === 'register') {
        if (!displayName.trim()) {
          setErrorMsg('Por favor, informe seu nome ou apelido.');
          setIsLoading(false);
          return;
        }
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const newProfile: UserProfile = {
          ...currentUser,
          id: userCred.user.uid,
          displayName: displayName.trim(),
          email: userCred.user.email || email,
          avatarId: selectedAvatar,
          ageGroup: selectedAge,
          updatedAt: new Date().toISOString()
        };
        await saveUserProfile(newProfile);
        onSuccess(newProfile);
        onClose();
      } else {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const updatedProfile: UserProfile = {
          ...currentUser,
          id: userCred.user.uid,
          email: userCred.user.email || email,
          displayName: userCred.user.displayName || displayName || 'Discípulo',
          updatedAt: new Date().toISOString()
        };
        await saveUserProfile(updatedProfile);
        onSuccess(updatedProfile);
        onClose();
      }
    } catch (err: unknown) {
      const errStr = err instanceof Error ? err.message : String(err);
      if (errStr.includes('auth/invalid-email')) {
        setErrorMsg('E-mail em formato inválido.');
      } else if (errStr.includes('auth/weak-password')) {
        setErrorMsg('A senha deve conter no mínimo 6 caracteres.');
      } else if (errStr.includes('auth/email-already-in-use')) {
        setErrorMsg('Este e-mail já está cadastrado. Tente entrar.');
      } else if (errStr.includes('auth/wrong-password') || errStr.includes('auth/user-not-found') || errStr.includes('invalid-credential')) {
        setErrorMsg('E-mail ou senha incorretos.');
      } else {
        setErrorMsg('Erro ao autenticar. Verifique sua conexão.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const updatedProfile: UserProfile = {
        ...currentUser,
        id: user.uid,
        email: user.email || undefined,
        displayName: user.displayName || displayName || 'Discípulo da Palavra',
        avatarId: selectedAvatar,
        ageGroup: selectedAge,
        updatedAt: new Date().toISOString()
      };
      await saveUserProfile(updatedProfile);
      onSuccess(updatedProfile);
      onClose();
    } catch (err: unknown) {
      console.warn('Google sign-in popup error', err);
      setErrorMsg('Não foi possível entrar com Google na janela atual.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickGuestSave = () => {
    const updated: UserProfile = {
      ...currentUser,
      displayName: displayName.trim() || 'Discípulo',
      avatarId: selectedAvatar,
      ageGroup: selectedAge,
      updatedAt: new Date().toISOString()
    };
    saveUserProfile(updated);
    onSuccess(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl border-2 border-amber-400/80 bg-gradient-to-b from-slate-900 to-indigo-950 p-6 text-white shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 mb-2 border border-amber-500/40">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black tracking-wide text-amber-300">
            {mode === 'login' ? 'Entrar no Quiz' : 'Criar Conta de Discípulo'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Salve suas conquistas, histórico e pontuação no ranking mundial!
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-950/60 p-1 border border-slate-800 mb-4">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              mode === 'login' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Já Tenho Conta
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              mode === 'register' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Criar Novo Cadastro
          </button>
        </div>

        {/* Google Quick Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full mb-4 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs tracking-wide shadow flex items-center justify-center gap-2 transition active:scale-98"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Continuar com Conta Google
        </button>

        <div className="relative flex items-center justify-center my-3">
          <div className="border-t border-slate-700 w-full" />
          <span className="bg-slate-900 px-3 text-[11px] text-slate-400 uppercase tracking-widest">
            ou com e-mail e senha
          </span>
          <div className="border-t border-slate-700 w-full" />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Seu Nome / Apelido</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Escolha seu Avatar Bíblico</label>
                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800">
                  {AVATARS.map(av => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setSelectedAvatar(av)}
                      className={`w-9 h-9 text-lg rounded-lg flex items-center justify-center transition ${
                        selectedAvatar === av ? 'bg-amber-500 scale-110 shadow' : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Sua Faixa Etária Principal</label>
                <select
                  value={selectedAge}
                  onChange={e => setSelectedAge(e.target.value as AgeCategory)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="kids">Crianças (5 a 11 anos) - Pequenos Discípulos</option>
                  <option value="teens">Jovens (12 a 17 anos) - Valentes da Fé</option>
                  <option value="adults">Adultos - Guerreiros da Palavra</option>
                  <option value="masters">Mestres / Teólogos - Nível Avançado</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">E-mail</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Senha</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-900/40 transition active:scale-98"
          >
            {isLoading ? 'Conectando...' : mode === 'login' ? 'Acessar Minha Conta' : 'Concluir Cadastro e Jogar'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={handleQuickGuestSave}
            className="text-xs text-slate-400 hover:text-amber-300 underline transition"
          >
            Continuar jogando localmente sem senha agora
          </button>
        </div>
      </div>
    </div>
  );
};
