import React, { useState, useEffect } from 'react';
import { Trophy, Award, Crown, Flame, Sparkles, RefreshCw, Star, ShieldCheck, Heart, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ScoreEntry, UserProfile, AgeCategory } from '../types';
import { fetchGlobalLeaderboard, deleteScoreFromLeaderboard, clearAllLeaderboardScores } from '../firebase';
import { ACHIEVEMENTS, calculateSpiritualLevel } from '../data/achievements';

interface LeaderboardViewProps {
  currentUser: UserProfile;
  onClose: () => void;
  onPlayAgain: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentUser,
  onClose,
  onPlayAgain,
}) => {
  const [activeTab, setActiveTab] = useState<'ranking' | 'achievements'>('ranking');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteIndividualScore = async (scoreId: string) => {
    await deleteScoreFromLeaderboard(scoreId);
    setScores(prev => prev.filter(s => s.id !== scoreId));
    showToast('Pontuação excluída do ranking com sucesso!');
  };

  const handleClearAll = async () => {
    setShowDeleteConfirmModal(false);
    setLoading(true);
    await clearAllLeaderboardScores(currentUser.id);
    setScores([]);
    setLoading(false);
    showToast('Todo o histórico de ranking foi zerado com sucesso!');
  };

  const handleClearUserScores = async () => {
    setShowDeleteConfirmModal(false);
    setLoading(true);
    const userScores = scores.filter(s => s.userId === currentUser.id);
    for (const s of userScores) {
      if (s.id) await deleteScoreFromLeaderboard(s.id);
    }
    await loadScores();
    setLoading(false);
    showToast('Suas pontuações foram removidas do ranking!');
  };

  const loadScores = async () => {
    setLoading(true);
    const data = await fetchGlobalLeaderboard(selectedCategory === 'all' ? undefined : selectedCategory);
    setScores(data);
    setLoading(false);
  };

  useEffect(() => {
    loadScores();
  }, [selectedCategory]);

  const spiritualRank = calculateSpiritualLevel(currentUser.totalScore);
  const unlockedSet = new Set(currentUser.unlockedAchievements);

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/95 flex flex-col backdrop-blur-md overflow-hidden text-white animate-fadeIn">
      {/* Top Header */}
      <header className="p-4 sm:p-5 border-b border-amber-500/30 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide">
              Mural da Honra & Conquistas
            </h2>
            <p className="text-xs text-slate-400">
              Competição saudável estimulando o estudo da Palavra
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition border border-slate-700"
        >
          Voltar ao Início
        </button>
      </header>

      {/* User Mini Bar */}
      <div className="bg-gradient-to-r from-amber-950/40 via-indigo-950/40 to-slate-900 px-4 sm:px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black flex items-center justify-center text-lg shadow-md border-2 border-amber-300">
            {currentUser.avatarId || '🕊️'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm sm:text-base">{currentUser.displayName}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                {spiritualRank}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Total: {currentUser.totalScore.toLocaleString('pt-BR')} bênçãos • Recorde: {currentUser.highestScore.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {currentUser.millionWins > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>{currentUser.millionWins}x Milionário da Fé</span>
            </div>
          )}
          <button
            onClick={onPlayAgain}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-md transition active:scale-95"
          >
            Jogar Agora
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 px-4 sm:px-6 bg-slate-900/50">
        <button
          onClick={() => setActiveTab('ranking')}
          className={`py-3 px-4 font-bold text-sm border-b-2 flex items-center gap-2 transition ${
            activeTab === 'ranking'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Ranking Global em Tempo Real
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`py-3 px-4 font-bold text-sm border-b-2 flex items-center gap-2 transition ${
            activeTab === 'achievements'
              ? 'border-amber-400 text-amber-300'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          Minhas Conquistas ({currentUser.unlockedAchievements.length}/{ACHIEVEMENTS.length})
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {activeTab === 'ranking' ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'Todos os Níveis' },
                  { id: 'kids', label: 'Crianças' },
                  { id: 'teens', label: 'Jovens' },
                  { id: 'adults', label: 'Adultos' },
                  { id: 'masters', label: 'Mestres' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadScores}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition border border-slate-700"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>

                {/* Botão de Exclusão de Ranking */}
                <button
                  onClick={() => setShowDeleteConfirmModal(true)}
                  disabled={loading || scores.length === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 hover:text-rose-100 text-xs font-bold transition border border-rose-500/40 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  title="Excluir pontuações do ranking"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Excluir Ranking</span>
                </button>
              </div>
            </div>

            {/* Leaderboard Table / Cards */}
            {loading ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-slate-400">Carregando ranking global...</p>
              </div>
            ) : scores.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                <Sparkles className="w-12 h-12 text-amber-400/50 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-slate-200">Seja o Primeiro no Ranking!</h4>
                <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                  Ainda não há pontuações registradas nesta categoria. Jogue agora e conquiste o topo do mural!
                </p>
                <button
                  onClick={onPlayAgain}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm tracking-wide shadow-lg"
                >
                  Jogar Esta Categoria
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {scores.map((score, index) => {
                  const isTop1 = index === 0;
                  const isTop2 = index === 1;
                  const isTop3 = index === 2;
                  const isCurrentUser = score.userId === currentUser.id;

                  return (
                    <div
                      key={score.id || index}
                      className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition ${
                        isCurrentUser
                          ? 'border-amber-400 bg-amber-500/10 shadow-md shadow-amber-500/10'
                          : isTop1
                          ? 'border-amber-400/80 bg-gradient-to-r from-amber-950/40 to-slate-900'
                          : 'border-slate-800 bg-slate-900/80 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Position Badge */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                            isTop1
                              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/50'
                              : isTop2
                              ? 'bg-slate-300 text-slate-950'
                              : isTop3
                              ? 'bg-amber-700 text-white'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {isTop1 ? '🥇' : isTop2 ? '🥈' : isTop3 ? '🥉' : index + 1}
                        </div>

                        {/* Player Avatar & Name */}
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{score.avatarId || '🕊️'}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm sm:text-base text-white">
                                {score.displayName}
                              </span>
                              {score.wonMillion && (
                                <span className="text-xs text-amber-400" title="Ganhou o Milhão!">
                                  👑
                                </span>
                              )}
                              {isCurrentUser && (
                                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                                  VOCÊ
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400 capitalize">
                              {score.category === 'kids'
                                ? 'Crianças'
                                : score.category === 'teens'
                                ? 'Jovens'
                                : score.category === 'adults'
                                ? 'Adultos'
                                : 'Mestres'} • {score.questionsAnswered} acertos
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right flex items-center gap-2 sm:gap-3">
                        <div>
                          <span className="text-base sm:text-lg font-black text-amber-300 block">
                            {score.score.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-[11px] text-slate-400">bênçãos</span>
                        </div>
                        {score.id && (
                          <button
                            onClick={() => handleDeleteIndividualScore(score.id!)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition"
                            title="Excluir esta pontuação do ranking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Achievements Grid */
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-indigo-200">Seu Progresso Espiritual</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Desbloqueie troféus e títulos ao estudar e acertar as perguntas bíblicas!
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-300">
                  {currentUser.unlockedAchievements.length} / {ACHIEVEMENTS.length}
                </span>
                <span className="text-xs text-slate-400 block">conquistas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {ACHIEVEMENTS.map(ach => {
                const isUnlocked = unlockedSet.has(ach.id);
                return (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-xl border transition ${
                      isUnlocked
                        ? 'border-amber-400/60 bg-gradient-to-br from-slate-900 to-amber-950/30 shadow-md shadow-amber-500/10'
                        : 'border-slate-800 bg-slate-900/40 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2.5 rounded-xl border ${
                          isUnlocked
                            ? 'bg-amber-500/20 text-amber-400 border-amber-400/50'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}
                      >
                        {isUnlocked ? <Award className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-bold text-sm ${isUnlocked ? 'text-amber-200' : 'text-slate-400'}`}>
                            {ach.title}
                          </h5>
                          {isUnlocked && <span className="text-xs text-emerald-400 font-bold">✓</span>}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Clearing Ranking */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl border-2 border-rose-500/60 bg-gradient-to-b from-slate-900 to-rose-950/80 p-6 text-white shadow-2xl">
            <div className="text-center mb-5">
              <div className="inline-flex p-3 rounded-full bg-rose-500/20 text-rose-400 mb-2 border border-rose-500/40">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black tracking-wide text-rose-200">
                Excluir Dados do Ranking
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Escolha qual exclusão deseja realizar no ranking de pontuações:
              </p>
            </div>

            <div className="space-y-3 my-4">
              <button
                onClick={handleClearUserScores}
                className="w-full text-left p-3.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 hover:border-amber-400/50 transition group"
              >
                <span className="font-bold text-sm text-white group-hover:text-amber-300 block">
                  Excluir Apenas Minhas Pontuações
                </span>
                <span className="text-xs text-slate-400">
                  Remove todas as suas partidas registradas no mural.
                </span>
              </button>

              <button
                onClick={handleClearAll}
                className="w-full text-left p-3.5 rounded-xl border border-rose-500/40 bg-rose-950/40 hover:bg-rose-900/60 transition group"
              >
                <span className="font-bold text-sm text-rose-300 group-hover:text-rose-200 block">
                  Zerar Todo o Histórico de Ranking
                </span>
                <span className="text-xs text-slate-300">
                  Limpa todas as pontuações e reinicia o ranking geral.
                </span>
              </button>
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowDeleteConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-400 text-emerald-300 text-xs font-bold shadow-2xl animate-fadeIn flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
