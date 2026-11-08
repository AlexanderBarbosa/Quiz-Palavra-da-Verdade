import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  User, 
  Play, 
  Sparkles, 
  Crown, 
  Flame, 
  Shield, 
  RotateCcw, 
  SkipForward, 
  Users, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Menu, 
  X,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';

import { Question, AgeCategory, UserProfile, MatchStats } from './types';
import { 
  BIBLE_QUESTIONS, 
  LADDER_STEPS, 
  getQuestionsForMatch, 
  getAlternateQuestion,
  resetSeenQuestions,
  getTotalQuestionsStats
} from './data/bibleQuestions';
import { ACHIEVEMENTS, calculateSpiritualLevel, checkNewAchievements } from './data/achievements';
import { sound } from './utils/soundEffects';
import { 
  getLocalUserProfile, 
  saveUserProfile, 
  postScoreToLeaderboard, 
  auth, 
  onAuthStateChanged, 
  fetchUserProfile 
} from './firebase';

import { CardsModal, GuestsModal, EldersModal, StudyFeedbackModal } from './components/LifelineModals';
import { LeaderboardView } from './components/LeaderboardView';
import { BibleStudyView } from './components/BibleStudyView';
import { AuthModal } from './components/AuthModal';

export default function App() {
  // Sound mute state
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const local = getLocalUserProfile();
    if (local) return local;
    return {
      id: `guest_${Date.now()}`,
      displayName: 'Discípulo da Fé',
      ageGroup: 'adults',
      avatarId: '🕊️',
      totalScore: 0,
      gamesPlayed: 0,
      millionWins: 0,
      highestScore: 0,
      level: 'Buscador da Verdade',
      unlockedAchievements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  // Modal Views
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showBibleStudy, setShowBibleStudy] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLadderDrawer, setShowLadderDrawer] = useState(false);

  // Lifeline Modals
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const [showEldersModal, setShowEldersModal] = useState(false);
  const [showStudyFeedback, setShowStudyFeedback] = useState(false);

  // Game Arena State
  const [gameActive, setGameActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AgeCategory>('adults');
  const [matchQuestions, setMatchQuestions] = useState<Question[]>([]);
  const [currentTierIndex, setCurrentTierIndex] = useState(0); // 0 to 9 (corresponds to tiers 1 to 10)
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmedAnswer, setConfirmedAnswer] = useState<boolean>(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [skipsRemaining, setSkipsRemaining] = useState(3);
  const [usedCards, setUsedCards] = useState(false);
  const [usedGuests, setUsedGuests] = useState(false);
  const [usedElders, setUsedElders] = useState(false);

  // Match Result & Stats
  const [gameOver, setGameOver] = useState(false);
  const [matchFinishedReason, setMatchFinishedReason] = useState<'won' | 'stopped' | 'lost'>('stopped');
  const [finalMatchScore, setFinalMatchScore] = useState(0);
  const [recentAchievements, setRecentAchievements] = useState<string[]>([]);

  // Suspense Timer
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [resetToast, setResetToast] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleResetHistory = () => {
    resetSeenQuestions('kids');
    resetSeenQuestions('teens');
    resetSeenQuestions('adults');
    resetSeenQuestions('masters');
    setResetToast(true);
    sound.playClick();
    setTimeout(() => setResetToast(false), 2500);
  };

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const remoteProfile = await fetchUserProfile(firebaseUser.uid);
        if (remoteProfile) {
          setUser(remoteProfile);
        } else {
          const newProfile: UserProfile = {
            ...user,
            id: firebaseUser.uid,
            displayName: firebaseUser.displayName || user.displayName,
            email: firebaseUser.email || undefined,
            updatedAt: new Date().toISOString(),
          };
          setUser(newProfile);
          saveUserProfile(newProfile);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Timer Countdown during Question
  useEffect(() => {
    if (gameActive && !confirmedAnswer && !gameOver && !showStudyFeedback) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeExpired();
            return 0;
          }
          if (prev <= 10) {
            sound.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameActive, confirmedAnswer, gameOver, showStudyFeedback, currentTierIndex]);

  const handleTimeExpired = () => {
    sound.playWrong();
    const currentStep = LADDER_STEPS[currentTierIndex];
    finishMatch('lost', currentStep.rewardWrong);
  };

  const toggleSound = () => {
    const state = sound.toggleMute();
    setIsMuted(state);
  };

  // Start New Game
  const startNewGame = (category: AgeCategory) => {
    setSelectedCategory(category);
    const questions = getQuestionsForMatch(category);
    setMatchQuestions(questions);
    setCurrentTierIndex(0);
    setSelectedOption(null);
    setConfirmedAnswer(false);
    setIsCorrectAnswer(null);
    setEliminatedOptions([]);
    setSkipsRemaining(3);
    setUsedCards(false);
    setUsedGuests(false);
    setUsedElders(false);
    setGameOver(false);
    setRecentAchievements([]);
    setTimeLeft(60);
    setGameActive(true);
    sound.playClick();
  };

  const currentQuestion = matchQuestions[currentTierIndex];
  const currentStep = LADDER_STEPS[currentTierIndex] || LADDER_STEPS[0];

  // Option Click
  const handleOptionSelect = (idx: number) => {
    if (confirmedAnswer || eliminatedOptions.includes(idx)) return;
    sound.playClick();
    setSelectedOption(idx);
  };

  // Confirm Answer ("Você tem certeza?")
  const handleConfirmAnswer = () => {
    if (selectedOption === null || confirmedAnswer || !currentQuestion) return;
    sound.playLockIn();
    setConfirmedAnswer(true);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    setIsCorrectAnswer(isCorrect);

    setTimeout(() => {
      if (isCorrect) {
        sound.playCorrect();
        const isLast = currentTierIndex === 9; // Tier 10 answered correctly!
        if (isLast) {
          // WON 1 MILLION!
          sound.playMillionWin();
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#F59E0B', '#FCD34D', '#10B981', '#3B82F6'],
          });
        }
        setShowStudyFeedback(true);
      } else {
        sound.playWrong();
        setShowStudyFeedback(true);
      }
    }, 1200);
  };

  // Advance from Feedback Modal
  const handleNextStep = () => {
    setShowStudyFeedback(false);

    if (isCorrectAnswer) {
      if (currentTierIndex === 9) {
        // Player won the 1 Million!
        finishMatch('won', 1000000);
      } else {
        // Next Question
        setCurrentTierIndex((prev) => prev + 1);
        setSelectedOption(null);
        setConfirmedAnswer(false);
        setIsCorrectAnswer(null);
        setEliminatedOptions([]);
        setTimeLeft(60);
      }
    } else {
      // Wrong answer -> match ends with wrong answer fallback reward
      finishMatch('lost', currentStep.rewardWrong);
    }
  };

  // Stop and Take Current Winnings ("Parar")
  const handleStopMatch = () => {
    sound.playClick();
    const takeHome = currentStep.rewardStop;
    finishMatch('stopped', takeHome);
  };

  // Finish Match & Update Stats / Firestore
  const finishMatch = (reason: 'won' | 'stopped' | 'lost', score: number) => {
    setGameOver(true);
    setGameActive(false);
    setMatchFinishedReason(reason);
    setFinalMatchScore(score);

    const questionsAnswered = reason === 'won' ? 10 : isCorrectAnswer ? currentTierIndex + 1 : currentTierIndex;
    const isMillion = reason === 'won';

    const matchStats: MatchStats = {
      score,
      questionsAnswered,
      wonMillion: isMillion,
      skipsUsed: 3 - skipsRemaining,
      cardsUsed: usedCards,
      guestsUsed: usedGuests,
      eldersUsed: usedElders,
      category: selectedCategory,
    };

    const newUnlocked = checkNewAchievements(user, matchStats);
    setRecentAchievements(newUnlocked);

    const updatedUser: UserProfile = {
      ...user,
      totalScore: user.totalScore + score,
      gamesPlayed: user.gamesPlayed + 1,
      millionWins: isMillion ? user.millionWins + 1 : user.millionWins,
      highestScore: Math.max(user.highestScore, score),
      level: calculateSpiritualLevel(user.totalScore + score),
      unlockedAchievements: Array.from(new Set([...user.unlockedAchievements, ...newUnlocked])),
      updatedAt: new Date().toISOString(),
    };

    setUser(updatedUser);
    saveUserProfile(updatedUser);

    // Save score to global leaderboard
    postScoreToLeaderboard({
      userId: updatedUser.id,
      displayName: updatedUser.displayName,
      avatarId: updatedUser.avatarId,
      score,
      category: selectedCategory,
      questionsAnswered,
      wonMillion: isMillion,
      createdAt: new Date().toISOString(),
    });
  };

  // Lifelines:
  // 1. Skip Question
  const handleSkipQuestion = () => {
    if (skipsRemaining <= 0 || confirmedAnswer || !currentQuestion) return;
    sound.playLifeline();
    const newQ = getAlternateQuestion(selectedCategory, currentQuestion.tier, currentQuestion.id);
    const updated = [...matchQuestions];
    updated[currentTierIndex] = newQ;
    setMatchQuestions(updated);
    setSkipsRemaining((prev) => prev - 1);
    setSelectedOption(null);
    setEliminatedOptions([]);
    setTimeLeft(60);
  };

  // 2. Cards Selected
  const handleCardSelected = (eliminatedCount: number) => {
    setShowCardsModal(false);
    setUsedCards(true);
    sound.playLifeline();

    if (!currentQuestion || eliminatedCount === 0) return;

    // Pick wrong options to eliminate
    const wrongIndices = [0, 1, 2, 3].filter((i) => i !== currentQuestion.correctIndex);
    const shuffledWrong = wrongIndices.sort(() => Math.random() - 0.5);
    const toEliminate = shuffledWrong.slice(0, eliminatedCount);
    setEliminatedOptions(toEliminate);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/30 px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-lg">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-xl shadow-md border-2 border-amber-300">
            ✝
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-black tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent leading-tight">
              Quiz Palavra da Verdade
            </h1>
            <span className="text-[10px] text-amber-300/80 font-bold uppercase tracking-widest hidden sm:inline-block">
              Desafio Bíblico da Palavra de Deus
            </span>
          </div>
        </div>

        {/* Action Center */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 border shadow-sm ${
              isMuted
                ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border-slate-700/80 hover:border-slate-600'
                : 'bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 hover:from-emerald-900/60 text-emerald-300 border-emerald-500/50 shadow-emerald-950/40'
            }`}
            title={isMuted ? 'Clique para ativar os efeitos sonoros' : 'Clique para silenciar os efeitos sonoros'}
          >
            <div className="relative flex items-center justify-center">
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400 transition-transform group-hover:scale-110" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400 transition-transform group-hover:scale-110" />
              )}
            </div>

            <span className="hidden sm:inline-block font-semibold">
              {isMuted ? 'Mudo' : 'Som'}
            </span>

            {/* Dynamic Equalizer sound waves animation when active */}
            {!isMuted && (
              <span className="flex items-center gap-0.5 ml-0.5 h-3">
                <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="w-0.5 h-3 bg-emerald-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </button>

          {/* Bible Study Library */}
          <button
            onClick={() => setShowBibleStudy(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-950/70 hover:bg-indigo-900 text-indigo-200 text-xs font-bold border border-indigo-500/40 transition"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">Estudos Bíblicos (Offline)</span>
          </button>

          {/* Leaderboard & Achievements */}
          <button
            onClick={() => setShowLeaderboard(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Ranking</span>
          </button>

          {/* Profile / Auth */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold border border-slate-700 transition"
          >
            <span className="text-base">{user.avatarId || '🕊️'}</span>
            <span className="hidden sm:inline max-w-[90px] truncate">{user.displayName}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {!gameActive && !gameOver ? (
          /* ================= HOME & CATEGORY SELECTOR ================= */
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 max-w-4xl mx-auto w-full">
            {/* Hero Banner */}
            <div className="text-center my-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Desafio Bíblico Interativo para Toda a Família
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Você Consegue Conquistar <br />
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-md">
                  1 Milhão de Bênçãos?
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Aprenda a Palavra de Deus em cada pergunta, utilize as ajudas bíblicas,
                suba de nível e compita no ranking global em tempo real!
              </p>

              {/* Anti-Repetition Assurance Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Perguntas inéditas sem repetição a cada nova partida</span>
              </div>
            </div>

            {/* Category Cards Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              {/* Kids Category */}
              <button
                onClick={() => startNewGame('kids')}
                className="group relative text-left p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-950/40 to-slate-900 border-2 border-sky-500/40 hover:border-sky-400 shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-98"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 text-2xl">
                    👶
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    5 a 11 anos
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-3 group-hover:text-sky-300 transition">
                  Pequenos Discípulos
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Perguntas infantis didáticas sobre histórias marcantes: Noé, Davi, Daniel, Jesus e os animais da arca.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-sky-400 group-hover:translate-x-1 transition">
                  Iniciar Partida Infantil →
                </div>
              </button>

              {/* Teens Category */}
              <button
                onClick={() => startNewGame('teens')}
                className="group relative text-left p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-violet-950/40 to-slate-900 border-2 border-violet-500/40 hover:border-violet-400 shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-98"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30 text-2xl">
                    ⚡
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30">
                    12 a 17 anos
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-3 group-hover:text-violet-300 transition">
                  Valentes da Fé
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Nível intermediário sobre armadura de Deus, parábolas, Ester, profetas, coragem e cartas de Paulo.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-violet-400 group-hover:translate-x-1 transition">
                  Iniciar Partida Jovem →
                </div>
              </button>

              {/* Adults Category */}
              <button
                onClick={() => startNewGame('adults')}
                className="group relative text-left p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 border-2 border-amber-500/50 hover:border-amber-400 shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-98"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-2xl">
                    🛡️
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    Geral / Adultos
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-3 group-hover:text-amber-300 transition">
                  Guerreiros da Palavra
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Perguntas desafiadoras sobre teologia, alianças bíblicas, o Tabernáculo, livros proféticos e doutrina.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-amber-400 group-hover:translate-x-1 transition">
                  Iniciar Partida Adulto →
                </div>
              </button>

              {/* Masters / Theologians */}
              <button
                onClick={() => startNewGame('masters')}
                className="group relative text-left p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border-2 border-emerald-500/40 hover:border-emerald-400 shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-98"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-2xl">
                    📜
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    Mestres / Avançado
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-3 group-hover:text-emerald-300 transition">
                  Mestres das Escrituras
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Perguntas aprofundadas com referências minuciosas, significados em hebraico/grego e escatologia bíblica.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition">
                  Iniciar Desafio Teológico →
                </div>
              </button>
            </div>

            {/* Quick Actions Footer */}
            <div className="flex flex-wrap items-center justify-center gap-3 my-4">
              <button
                onClick={() => setShowBibleStudy(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 transition"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Consultar Biblioteca Bíblica Offline
              </button>
              <button
                onClick={() => setShowLeaderboard(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 transition"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                Ver Ranking Mundial
              </button>
              <button
                onClick={handleResetHistory}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
                title="Limpar o histórico de perguntas vistas para reiniciar o ciclo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar Ciclo de Perguntas
              </button>
            </div>

            {/* Reset Toast Notification */}
            {resetToast && (
              <div className="fixed bottom-6 z-50 px-4 py-2 rounded-xl bg-emerald-900/90 border border-emerald-400 text-emerald-200 text-xs font-bold shadow-xl animate-fadeIn flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Histórico reiniciado! Todas as perguntas estão disponíveis novamente.</span>
              </div>
            )}
          </div>
        ) : gameActive && currentQuestion ? (
          /* ================= ACTIVE GAME ARENA ================= */
          <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-2 sm:p-4 gap-4">
            {/* Left/Center: Question & Lifeline Arena */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              {/* Prize Ribbon & Timer Bar */}
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-black text-amber-300 text-sm">
                    {currentTierIndex + 1}/10
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
                      Pergunta Valendo
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-amber-300">
                      {currentStep.rewardCorrect.toLocaleString('pt-BR')} Bênçãos
                    </span>
                  </div>
                </div>

                {/* Acertar / Parar / Errar Summary */}
                <div className="flex items-center gap-2 sm:gap-4 text-xs font-bold">
                  <div className="bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-lg text-emerald-300">
                    <span className="text-[10px] text-emerald-400/80 block">ACERTAR</span>
                    +{currentStep.rewardCorrect.toLocaleString('pt-BR')}
                  </div>
                  <div className="bg-amber-950/60 border border-amber-500/40 px-2.5 py-1 rounded-lg text-amber-300">
                    <span className="text-[10px] text-amber-400/80 block">PARAR</span>
                    {currentStep.rewardStop.toLocaleString('pt-BR')}
                  </div>
                  <div className="bg-rose-950/60 border border-rose-500/40 px-2.5 py-1 rounded-lg text-rose-300">
                    <span className="text-[10px] text-rose-400/80 block">ERRAR</span>
                    {currentStep.rewardWrong.toLocaleString('pt-BR')}
                  </div>
                </div>

                {/* Suspense Timer */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                    <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
                    <span className={`font-mono font-bold text-sm ${timeLeft <= 10 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {timeLeft}s
                    </span>
                  </div>

                  {/* Mobile Ladder Drawer Trigger */}
                  <button
                    onClick={() => setShowLadderDrawer(!showLadderDrawer)}
                    className="md:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-400"
                    title="Ver escala de bênçãos"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Biblical Question Box */}
              <div className="bg-gradient-to-b from-indigo-950/50 via-slate-900 to-slate-900 border-2 border-amber-400/60 rounded-3xl p-5 sm:p-7 shadow-2xl relative text-center flex flex-col justify-center min-h-[160px]">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-0.5 rounded-full">
                    {currentTierIndex === 9 ? '👑 A PERGUNTA DO MILHÃO 👑' : `Nível ${currentTierIndex + 1} de 10`}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-white leading-relaxed max-w-3xl mx-auto">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* 4 Alternative Choices (A, B, C, D) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((optionText, idx) => {
                  const letter = ['A', 'B', 'C', 'D'][idx];
                  const isSelected = selectedOption === idx;
                  const isEliminated = eliminatedOptions.includes(idx);
                  const isConfirmed = confirmedAnswer;
                  const isRight = isConfirmed && idx === currentQuestion.correctIndex;
                  const isWrong = isConfirmed && isSelected && idx !== currentQuestion.correctIndex;

                  return (
                    <button
                      key={idx}
                      disabled={isConfirmed || isEliminated}
                      onClick={() => handleOptionSelect(idx)}
                      className={`relative flex items-center p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                        isEliminated
                          ? 'opacity-25 border-slate-800 bg-slate-900 cursor-not-allowed line-through'
                          : isRight
                          ? 'border-emerald-400 bg-emerald-600/30 shadow-lg shadow-emerald-500/30 scale-[1.01]'
                          : isWrong
                          ? 'border-rose-500 bg-rose-600/30 shadow-lg shadow-rose-500/30'
                          : isSelected
                          ? 'border-amber-400 bg-gradient-to-r from-amber-500/30 to-amber-600/20 shadow-lg shadow-amber-500/30 scale-[1.01]'
                          : 'border-slate-700 bg-slate-900/80 hover:border-amber-400/70 hover:bg-slate-850 active:scale-98'
                      }`}
                    >
                      {/* Letter Badge */}
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 mr-3 border ${
                          isRight
                            ? 'bg-emerald-500 text-slate-950 border-white'
                            : isWrong
                            ? 'bg-rose-500 text-white border-white'
                            : isSelected
                            ? 'bg-amber-400 text-slate-950 border-white'
                            : 'bg-slate-800 text-amber-300 border-slate-700'
                        }`}
                      >
                        {letter}
                      </span>

                      {/* Text */}
                      <span className={`text-xs sm:text-sm font-semibold flex-1 ${isSelected ? 'text-white font-bold' : 'text-slate-200'}`}>
                        {optionText}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action & Lifeline Control Bar */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
                {/* Lifeline Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Cartas */}
                  <button
                    disabled={usedCards || confirmedAnswer}
                    onClick={() => setShowCardsModal(true)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      usedCards
                        ? 'opacity-40 border-slate-800 bg-slate-900 text-slate-500 cursor-not-allowed'
                        : 'border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 active:scale-95'
                    }`}
                    title="Elimine de 1 a 3 alternativas incorretas"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Cartas</span>
                  </button>

                  {/* Universitários / Estudiosos */}
                  <button
                    disabled={usedGuests || confirmedAnswer}
                    onClick={() => {
                      setShowGuestsModal(true);
                      setUsedGuests(true);
                      sound.playLifeline();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      usedGuests
                        ? 'opacity-40 border-slate-800 bg-slate-900 text-slate-500 cursor-not-allowed'
                        : 'border-blue-500/50 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 active:scale-95'
                    }`}
                    title="Veja a votação dos estudantes da Bíblia"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Estudiosos</span>
                  </button>

                  {/* Placas dos Anciãos */}
                  <button
                    disabled={usedElders || confirmedAnswer}
                    onClick={() => {
                      setShowEldersModal(true);
                      setUsedElders(true);
                      sound.playLifeline();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      usedElders
                        ? 'opacity-40 border-slate-800 bg-slate-900 text-slate-500 cursor-not-allowed'
                        : 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 active:scale-95'
                    }`}
                    title="Ouça o conselho de 3 anciãos"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Placas</span>
                  </button>

                  {/* Pulos */}
                  <button
                    disabled={skipsRemaining <= 0 || confirmedAnswer}
                    onClick={handleSkipQuestion}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      skipsRemaining <= 0
                        ? 'opacity-40 border-slate-800 bg-slate-900 text-slate-500 cursor-not-allowed'
                        : 'border-purple-500/50 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 active:scale-95'
                    }`}
                    title="Pular esta pergunta sem perder pontuação"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                    <span>Pular ({skipsRemaining})</span>
                  </button>
                </div>

                {/* Confirm & Stop Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Parar */}
                  <button
                    disabled={confirmedAnswer}
                    onClick={handleStopMatch}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs tracking-wide transition active:scale-95"
                  >
                    Parar e Levar ({currentStep.rewardStop.toLocaleString('pt-BR')})
                  </button>

                  {/* Você tem certeza? / Confirmar */}
                  <button
                    disabled={selectedOption === null || confirmedAnswer}
                    onClick={handleConfirmAnswer}
                    className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wide shadow-lg transition active:scale-95 ${
                      selectedOption !== null && !confirmedAnswer
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-900/40 animate-pulse'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    Confirmar Resposta!
                  </button>
                </div>
              </div>
            </div>

            {/* Right: The Ladder Steps (Desktop & Mobile Drawer) */}
            <aside
              className={`fixed inset-y-0 right-0 z-50 md:static md:z-auto w-72 bg-slate-900 border-l md:border border-amber-500/30 md:rounded-2xl p-4 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
                showLadderDrawer ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-sm text-amber-200">Escala de Bênçãos</span>
                </div>
                <button
                  onClick={() => setShowLadderDrawer(false)}
                  className="md:hidden text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 10 Ladder Rungs from 1 Million down to 1 Thousand */}
              <div className="space-y-1.5 my-3 flex-1 overflow-y-auto">
                {[...LADDER_STEPS].reverse().map((step) => {
                  const stepIndex = step.tier - 1;
                  const isCurrent = stepIndex === currentTierIndex;
                  const isPassed = stepIndex < currentTierIndex;
                  const isMillion = step.tier === 10;

                  return (
                    <div
                      key={step.tier}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                          : isPassed
                          ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400'
                          : isMillion
                          ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="text-[10px] w-4">{step.tier}.</span>
                        <span>{isMillion ? '👑 1 MILHÃO' : `${step.rewardCorrect.toLocaleString('pt-BR')}`}</span>
                      </span>
                      <span>
                        {isCurrent ? '▶ ATUAL' : isPassed ? '✓' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
                Categoria: <strong className="text-amber-300 capitalize">{selectedCategory}</strong>
              </div>
            </aside>
          </div>
        ) : gameOver ? (
          /* ================= MATCH OVER / VICTORY SUMMARY ================= */
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="max-w-md w-full bg-gradient-to-b from-slate-900 to-indigo-950 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-5">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto text-3xl">
                {matchFinishedReason === 'won' ? '👑' : matchFinishedReason === 'stopped' ? '🛡️' : '📖'}
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-1">
                  Resultado da Partida
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {matchFinishedReason === 'won'
                    ? 'GLÓRIA A DEUS! 1 MILHÃO!'
                    : matchFinishedReason === 'stopped'
                    ? 'Parou com Sabedoria!'
                    : 'Fim de Partida! Continue Estudando!'}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-2">
                <span className="text-xs text-slate-400 block">Bênçãos Conquistadas Nesta Partida</span>
                <span className="text-3xl sm:text-4xl font-black text-amber-300">
                  {finalMatchScore.toLocaleString('pt-BR')}
                </span>
                <span className="text-xs text-emerald-400 block font-semibold">
                  Pontos somados ao seu perfil e ranking global!
                </span>
              </div>

              {recentAchievements.length > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left space-y-1">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Nova(s) Conquista(s) Desbloqueada(s)!
                  </span>
                  {recentAchievements.map((achId) => {
                    const ach = ACHIEVEMENTS.find((a) => a.id === achId);
                    return (
                      <p key={achId} className="text-xs text-slate-200 font-semibold">
                        🏆 {ach?.title}: <span className="text-slate-400 font-normal">{ach?.description}</span>
                      </p>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={() => startNewGame(selectedCategory)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-900/40 transition active:scale-98"
                >
                  Jogar Novamente Nesta Categoria
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setGameOver(false);
                      setShowLeaderboard(true);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
                  >
                    Ver Ranking
                  </button>
                  <button
                    onClick={() => {
                      setGameOver(false);
                      setShowBibleStudy(true);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 font-bold text-xs border border-indigo-500/30 transition"
                  >
                    Estudo Bíblico
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* Lifeline Modals */}
      <CardsModal
        isOpen={showCardsModal}
        onClose={() => setShowCardsModal(false)}
        onCardSelected={handleCardSelected}
      />

      {currentQuestion && (
        <>
          <GuestsModal
            isOpen={showGuestsModal}
            onClose={() => setShowGuestsModal(false)}
            correctIndex={currentQuestion.correctIndex}
            options={currentQuestion.options}
          />

          <EldersModal
            isOpen={showEldersModal}
            onClose={() => setShowEldersModal(false)}
            correctIndex={currentQuestion.correctIndex}
            options={currentQuestion.options}
          />

          <StudyFeedbackModal
            isOpen={showStudyFeedback}
            isCorrect={isCorrectAnswer ?? false}
            questionText={currentQuestion.question}
            correctAnswerText={currentQuestion.options[currentQuestion.correctIndex]}
            biblicalReference={currentQuestion.biblicalReference}
            explanation={currentQuestion.explanation}
            curiosity={currentQuestion.curiosity}
            rewardEarned={currentStep.rewardCorrect}
            onNext={handleNextStep}
          />
        </>
      )}

      {/* Leaderboard View Modal */}
      {showLeaderboard && (
        <LeaderboardView
          currentUser={user}
          onClose={() => setShowLeaderboard(false)}
          onPlayAgain={() => {
            setShowLeaderboard(false);
            startNewGame(selectedCategory);
          }}
        />
      )}

      {/* Bible Study Library Modal */}
      {showBibleStudy && (
        <BibleStudyView
          onClose={() => setShowBibleStudy(false)}
          onStartQuiz={() => {
            setShowBibleStudy(false);
            startNewGame(selectedCategory);
          }}
        />
      )}

      {/* User Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={user}
        onSuccess={(updated) => {
          setUser(updated);
        }}
      />
    </div>
  );
}
