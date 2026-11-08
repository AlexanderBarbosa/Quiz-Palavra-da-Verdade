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

  // Keyboard accessibility shortcuts (A, B, C, D or 1, 2, 3, 4, Enter, Space)
  useEffect(() => {
    if (!gameActive || confirmedAnswer || gameOver || showStudyFeedback) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') {
        handleOptionSelect(0);
      } else if (key === 'B' || key === '2') {
        handleOptionSelect(1);
      } else if (key === 'C' || key === '3') {
        handleOptionSelect(2);
      } else if (key === 'D' || key === '4') {
        handleOptionSelect(3);
      } else if (key === 'ENTER' || key === ' ') {
        if (selectedOption !== null && !confirmedAnswer) {
          e.preventDefault();
          handleConfirmAnswer();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, confirmedAnswer, gameOver, showStudyFeedback, selectedOption, currentQuestion, eliminatedOptions]);

  return (
    <div className="min-h-screen bg-divine-canvas text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans-ui">
      {/* Top Navigation Bar - Strict 3-Zone Contract */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-8 py-3 flex items-center justify-between gap-6 shadow-sm">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] border border-amber-300/60 shrink-0">
            ✝
          </div>
          <span className="font-display font-bold text-base sm:text-lg tracking-wide text-amber-100 whitespace-nowrap">
            Quiz Palavra da Verdade
          </span>
        </div>

        {/* Zone 2: Single-Line Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => {
              if (gameActive) {
                if (window.confirm('Deseja interromper o jogo atual e voltar à biblioteca?')) {
                  setGameActive(false);
                  setShowBibleStudy(true);
                }
              } else {
                setShowBibleStudy(true);
              }
            }}
            className="flex items-center gap-2 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-4 h-4 text-amber-400/80" />
            <span>Biblioteca Bíblica (66 Livros)</span>
          </button>

          <button
            onClick={() => setShowLeaderboard(true)}
            className="flex items-center gap-2 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            <Trophy className="w-4 h-4 text-amber-400/80" />
            <span>Mural da Honra</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Audio Toggle + User Profile) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Sound Toggle with Equalizer */}
          <button
            onClick={toggleSound}
            className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              isMuted
                ? 'bg-slate-900/60 hover:bg-slate-900 text-slate-400 border-white/[0.08]'
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}
            title={isMuted ? 'Ativar som' : 'Desativar som'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400/90" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}

            <span className="hidden sm:inline-block">
              {isMuted ? 'Mudo' : 'Som'}
            </span>

            {!isMuted && (
              <span className="flex items-center gap-0.5 ml-0.5 h-3" aria-hidden="true">
                <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="w-0.5 h-3 bg-amber-300 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              </span>
            )}
          </button>

          {/* Quick Study Icon on Mobile */}
          <button
            onClick={() => setShowBibleStudy(true)}
            className="md:hidden p-2 rounded-lg bg-slate-900/60 text-slate-300 hover:text-white border border-white/[0.08]"
            title="Estudo Bíblico"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
          </button>

          {/* Quick Ranking Icon on Mobile */}
          <button
            onClick={() => setShowLeaderboard(true)}
            className="md:hidden p-2 rounded-lg bg-slate-900/60 text-slate-300 hover:text-white border border-white/[0.08]"
            title="Ranking"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
          </button>

          {/* Profile / Auth */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-200 text-xs font-semibold border border-white/[0.08] transition hover:border-amber-400/30"
          >
            <span className="text-sm">{user.avatarId || '🕊️'}</span>
            <span className="hidden sm:inline max-w-[100px] truncate">{user.displayName}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {!gameActive && !gameOver ? (
          /* ================= HOME & CATEGORY SELECTOR ================= */
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 max-w-5xl mx-auto w-full">
            {/* Editorial Hero Header */}
            <div className="text-center my-4 space-y-3 max-w-2xl">
              <p className="text-[11px] font-semibold tracking-widest text-amber-400/90 uppercase">
                Desafio das Sagradas Escrituras
              </p>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight text-balance">
                Você Consegue Alcançar <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
                  1 Milhão de Bênçãos?
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
                Teste seus conhecimentos bíblicos através de 10 níveis progressivos.
                Utilize as ajudas da igreja, consulte passagens sagradas e compita no mural global.
              </p>

              {/* Clean unboxed proof metadata with subtle typographic separators */}
              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-slate-400 pt-2">
                <span className="text-emerald-400 font-medium">Perguntas Inéditas sem Repetição</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>66 Livros Canônicos</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>4 Categorias de Idade</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Mural em Tempo Real</span>
              </div>
            </div>

            {/* Handcrafted Category Cards Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {/* Kids Category */}
              <button
                onClick={() => startNewGame('kids')}
                className="tactile-card group text-left p-6 rounded-2xl transition-all duration-200 hover:border-sky-400/40 hover:-translate-y-0.5 active:translate-y-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-sky-400">Pequenos Discípulos</span>
                    <span className="text-slate-500 font-mono">5 a 11 anos</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-sky-200 transition-colors">
                    Histórias Bíblicas & Princípios
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Perguntas didáticas e inspiradoras sobre Noé, Davi e Golias, Daniel na cova dos leões, o nascimento de Jesus e os milagres do Evangelho.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                  <span>Iniciar Partida Infantil</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </button>

              {/* Teens Category */}
              <button
                onClick={() => startNewGame('teens')}
                className="tactile-card group text-left p-6 rounded-2xl transition-all duration-200 hover:border-violet-400/40 hover:-translate-y-0.5 active:translate-y-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-violet-400">Valentes da Fé</span>
                    <span className="text-slate-500 font-mono">12 a 17 anos</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-violet-200 transition-colors">
                    Heróis, Parábolas & Coragem
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Desafios intermediários sobre a Armadura de Deus, as viagens missionárias de Paulo, as cartas dos apóstolos e a rainha Ester.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-violet-400 group-hover:text-violet-300">
                  <span>Iniciar Partida Jovem</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </button>

              {/* Adults Category */}
              <button
                onClick={() => startNewGame('adults')}
                className="tactile-card group text-left p-6 rounded-2xl transition-all duration-200 hover:border-amber-400/50 hover:-translate-y-0.5 active:translate-y-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-amber-400">Guerreiros da Palavra</span>
                    <span className="text-slate-500 font-mono">Geral / Adultos</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    Doutrina, Alianças & História
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Perguntas aprofundadas sobre o Tabernáculo, a Lei Mosaica, os profetas maiores e menores, cartas paulinas e teologia da salvação.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                  <span>Iniciar Partida Adulto</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </button>

              {/* Masters Category */}
              <button
                onClick={() => startNewGame('masters')}
                className="tactile-card group text-left p-6 rounded-2xl transition-all duration-200 hover:border-emerald-400/40 hover:-translate-y-0.5 active:translate-y-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-emerald-400">Mestres das Escrituras</span>
                    <span className="text-slate-500 font-mono">Teológico / Avançado</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-emerald-200 transition-colors">
                    Exegese, Línguas Originais & Profecia
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Perguntas minuciosas sobre termos em hebraico/grego, escatologia bíblica, cronologia dos reis de Judá e Israel e contexto histórico apocalíptico.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                  <span>Iniciar Desafio Teológico</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </button>
            </div>

            {/* Quick Actions Strip */}
            <div className="flex flex-wrap items-center justify-center gap-3 my-2">
              <button
                onClick={() => setShowBibleStudy(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-white/[0.08] transition"
              >
                <BookOpen className="w-4 h-4 text-amber-400/80" />
                <span>Explorar Biblioteca Bíblica Offline</span>
              </button>

              <button
                onClick={() => setShowLeaderboard(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-white/[0.08] transition"
              >
                <Trophy className="w-4 h-4 text-amber-400/80" />
                <span>Ver Mural da Honra</span>
              </button>

              <button
                onClick={handleResetHistory}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/40 hover:bg-slate-900 text-xs font-medium text-slate-400 hover:text-slate-200 border border-white/[0.06] transition"
                title="Reiniciar histórico de perguntas vistas neste dispositivo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Ciclo de Perguntas</span>
              </button>
            </div>

            {/* Reset Toast */}
            {resetToast && (
              <div className="fixed bottom-6 z-50 px-4 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-semibold shadow-2xl animate-fadeIn flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Histórico reiniciado. Todas as perguntas estão ativas novamente.</span>
              </div>
            )}
          </div>
        ) : gameActive && currentQuestion ? (
          /* ================= ACTIVE GAME ARENA ================= */
          <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-3 sm:p-6 gap-6">
            {/* Left/Center: Question & Lifeline Arena */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              {/* Prize Ribbon & Timer Console */}
              <div className="tactile-card rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center font-display font-bold text-amber-300 text-sm">
                    {currentTierIndex + 1}/10
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">
                      Valendo Agora
                    </span>
                    <span className="text-xl sm:text-2xl font-bold font-data text-amber-300 tracking-tight">
                      {currentStep.rewardCorrect.toLocaleString('pt-BR')} <span className="text-sm font-sans-ui font-normal text-amber-400/80">Bênçãos</span>
                    </span>
                  </div>
                </div>

                {/* Acertar / Parar / Errar Broadcast Strip */}
                <div className="flex items-center gap-2 sm:gap-3 text-xs">
                  <div className="bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-300">
                    <span className="text-[9px] uppercase tracking-wider text-emerald-400/80 block font-semibold">Acertar</span>
                    <span className="font-data font-bold">+{currentStep.rewardCorrect.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-300">
                    <span className="text-[9px] uppercase tracking-wider text-amber-400/80 block font-semibold">Parar</span>
                    <span className="font-data font-bold">{currentStep.rewardStop.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="bg-rose-950/40 border border-rose-500/30 px-3 py-1.5 rounded-xl text-rose-300">
                    <span className="text-[9px] uppercase tracking-wider text-rose-400/80 block font-semibold">Errar</span>
                    <span className="font-data font-bold">{currentStep.rewardWrong.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                {/* Suspense Timer with Tabular Digits */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/[0.08]">
                    <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
                    <span className={`font-data font-bold text-sm ${timeLeft <= 10 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
                    </span>
                  </div>

                  {/* Mobile Ladder Trigger */}
                  <button
                    onClick={() => setShowLadderDrawer(!showLadderDrawer)}
                    className="md:hidden p-2 rounded-xl bg-slate-900 border border-white/[0.08] text-amber-400"
                    title="Ver escala de bênçãos"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Biblical Question Box */}
              <div className="tactile-card rounded-3xl p-6 sm:p-8 text-center flex flex-col justify-center min-h-[170px] relative border-amber-400/30">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-[11px] font-semibold tracking-widest text-amber-400 uppercase font-data">
                    {currentTierIndex === 9 ? 'A Grande Pergunta do Milhão' : `Escrituras Sagradas · Nível ${currentTierIndex + 1} de 10`}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-2xl font-bold text-slate-100 leading-snug max-w-3xl mx-auto text-balance">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* 4 Alternative Choices (A, B, C, D) with Tactile Keycaps & Keyboard Hints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                      className={`relative flex items-center p-4 rounded-2xl border transition-all duration-150 text-left cursor-pointer group ${
                        isEliminated
                          ? 'opacity-25 border-slate-800 bg-slate-900/40 cursor-not-allowed line-through'
                          : isRight
                          ? 'border-emerald-400/80 bg-emerald-950/50 shadow-lg shadow-emerald-950/50 scale-[1.01]'
                          : isWrong
                          ? 'border-rose-500/80 bg-rose-950/50 shadow-lg shadow-rose-950/50'
                          : isSelected
                          ? 'border-amber-400 bg-amber-950/30 shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/40 scale-[1.01]'
                          : 'border-white/[0.08] bg-slate-900/60 hover:bg-slate-900 hover:border-amber-400/40 active:translate-y-0.5'
                      }`}
                    >
                      {/* Tactile Keycap Letter */}
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-data font-bold text-sm shrink-0 mr-3 border transition-colors ${
                          isRight
                            ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                            : isWrong
                            ? 'bg-rose-500 text-white border-rose-300'
                            : isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-200'
                            : 'bg-slate-800/80 text-amber-300 border-white/[0.08] group-hover:border-amber-400/40'
                        }`}
                      >
                        {letter}
                      </span>

                      {/* Option Text */}
                      <span className={`text-xs sm:text-sm font-medium flex-1 ${isSelected ? 'text-white font-semibold' : 'text-slate-200'}`}>
                        {optionText}
                      </span>

                      {/* Non-Hue Status Icons & Keyboard Shortcut Clue */}
                      <div className="ml-2 shrink-0">
                        {isRight ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isWrong ? (
                          <AlertCircle className="w-5 h-5 text-rose-400" />
                        ) : (
                          <span className="hidden sm:inline-block text-[10px] font-mono text-slate-500 uppercase px-1.5 py-0.5 rounded border border-white/[0.05] group-hover:text-amber-400/70">
                            [{letter}]
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action & Lifeline Dock */}
              <div className="tactile-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                {/* Lifeline Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Cartas */}
                  <button
                    disabled={usedCards || confirmedAnswer}
                    onClick={() => setShowCardsModal(true)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                      usedCards
                        ? 'opacity-30 border-white/[0.05] bg-slate-900 text-slate-500 cursor-not-allowed'
                        : 'border-white/[0.08] bg-slate-900/80 text-amber-300 hover:bg-slate-850 hover:border-amber-400/40 active:translate-y-0.5'
                    }`}
                    title="Elimine de 1 a 3 alternativas incorretas"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                      usedGuests
                        ? 'opacity-30 border-white/[0.05] bg-slate-900 text-slate-500 cursor-not-allowed'
                        : 'border-white/[0.08] bg-slate-900/80 text-sky-300 hover:bg-slate-850 hover:border-sky-400/40 active:translate-y-0.5'
                    }`}
                    title="Veja a votação dos estudantes da Bíblia"
                  >
                    <Users className="w-3.5 h-3.5 text-sky-400" />
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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                      usedElders
                        ? 'opacity-30 border-white/[0.05] bg-slate-900 text-slate-500 cursor-not-allowed'
                        : 'border-white/[0.08] bg-slate-900/80 text-emerald-300 hover:bg-slate-850 hover:border-emerald-400/40 active:translate-y-0.5'
                    }`}
                    title="Ouça o conselho de 3 anciãos"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Placas</span>
                  </button>

                  {/* Pulos */}
                  <button
                    disabled={skipsRemaining <= 0 || confirmedAnswer}
                    onClick={handleSkipQuestion}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                      skipsRemaining <= 0
                        ? 'opacity-30 border-white/[0.05] bg-slate-900 text-slate-500 cursor-not-allowed'
                        : 'border-white/[0.08] bg-slate-900/80 text-violet-300 hover:bg-slate-850 hover:border-violet-400/40 active:translate-y-0.5'
                    }`}
                    title="Pular esta pergunta sem perder pontuação"
                  >
                    <SkipForward className="w-3.5 h-3.5 text-violet-400" />
                    <span>Pular ({skipsRemaining})</span>
                  </button>
                </div>

                {/* Confirm & Stop Controls */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  {/* Parar */}
                  <button
                    disabled={confirmedAnswer}
                    onClick={handleStopMatch}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-white/[0.08] font-semibold text-xs transition active:translate-y-0.5"
                  >
                    Parar e Levar ({currentStep.rewardStop.toLocaleString('pt-BR')})
                  </button>

                  {/* Confirmar */}
                  <button
                    disabled={selectedOption === null || confirmedAnswer}
                    onClick={handleConfirmAnswer}
                    className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition ${
                      selectedOption !== null && !confirmedAnswer
                        ? 'tactile-button-primary text-slate-950 font-extrabold cursor-pointer'
                        : 'bg-slate-900 text-slate-500 border border-white/[0.05] cursor-not-allowed'
                    }`}
                  >
                    Confirmar Resposta
                  </button>
                </div>
              </div>
            </div>

            {/* Right: The Ladder Steps (Desktop & Mobile Drawer) */}
            <aside
              className={`fixed inset-y-0 right-0 z-50 md:static md:z-auto w-72 tactile-card border-l md:border border-white/[0.08] md:rounded-2xl p-4 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${
                showLadderDrawer ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="font-display font-bold text-sm text-amber-200">Escala de Bênçãos</span>
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
                  const isSafeHaven = step.tier === 5;

                  return (
                    <div
                      key={step.tier}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs border transition ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-950/40'
                          : isPassed
                          ? 'border-emerald-500/20 bg-emerald-950/20 text-emerald-400'
                          : isMillion
                          ? 'border-amber-500/30 bg-amber-950/15 text-amber-300 font-semibold'
                          : isSafeHaven
                          ? 'border-sky-500/30 bg-sky-950/15 text-sky-300 font-semibold'
                          : 'border-white/[0.04] bg-slate-900/40 text-slate-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-data">
                        <span className="text-[10px] w-4 opacity-60">{step.tier}.</span>
                        <span>{isMillion ? '👑 1.000.000' : `${step.rewardCorrect.toLocaleString('pt-BR')}`}</span>
                      </span>

                      <div className="flex items-center gap-1.5 text-[10px] font-sans-ui">
                        {isSafeHaven && !isCurrent && (
                          <span className="text-[9px] text-sky-400/80 uppercase font-semibold">Piso Seguro</span>
                        )}
                        {isCurrent ? (
                          <span className="font-bold tracking-wider">▶ ATUAL</span>
                        ) : isPassed ? (
                          <span className="text-emerald-400">✓</span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-white/[0.08] text-[11px] text-slate-400 text-center flex items-center justify-center gap-2">
                <span>Categoria:</span>
                <span className="text-amber-300 font-semibold capitalize">{selectedCategory}</span>
              </div>
            </aside>
          </div>
        ) : gameOver ? (
          /* ================= MATCH OVER / VICTORY SUMMARY ================= */
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="max-w-md w-full tactile-card rounded-3xl p-6 sm:p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto text-3xl shadow-inner">
                {matchFinishedReason === 'won' ? '👑' : matchFinishedReason === 'stopped' ? '🛡️' : '📖'}
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 block mb-1">
                  Resultado da Partida
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white text-balance">
                  {matchFinishedReason === 'won'
                    ? 'Glória a Deus! 1 Milhão de Bênçãos!'
                    : matchFinishedReason === 'stopped'
                    ? 'Parou com Sabedoria'
                    : 'Fim de Partida. Continue Estudando!'}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/[0.08] space-y-2">
                <span className="text-xs text-slate-400 block">Bênçãos Conquistadas</span>
                <span className="text-3xl sm:text-4xl font-bold font-data text-amber-300 block">
                  {finalMatchScore.toLocaleString('pt-BR')}
                </span>
                <span className="text-xs text-emerald-400 block font-medium">
                  Pontos somados ao seu perfil e ao mural global
                </span>
              </div>

              {recentAchievements.length > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left space-y-1.5">
                  <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Nova(s) Conquista(s) Desbloqueada(s)!
                  </span>
                  {recentAchievements.map((achId) => {
                    const ach = ACHIEVEMENTS.find((a) => a.id === achId);
                    return (
                      <p key={achId} className="text-xs text-slate-200">
                        🏆 <strong className="text-white">{ach?.title}:</strong> <span className="text-slate-400">{ach?.description}</span>
                      </p>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={() => startNewGame(selectedCategory)}
                  className="w-full py-3 rounded-xl tactile-button-primary text-slate-950 font-bold text-sm tracking-wide transition cursor-pointer"
                >
                  Jogar Novamente Nesta Categoria
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setGameOver(false);
                      setShowLeaderboard(true);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-semibold text-xs border border-white/[0.08] transition"
                  >
                    Ver Ranking
                  </button>
                  <button
                    onClick={() => {
                      setGameOver(false);
                      setShowBibleStudy(true);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-amber-300 font-semibold text-xs border border-white/[0.08] transition"
                  >
                    Estudar Bíblia
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
