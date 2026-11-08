import React, { useState } from 'react';
import { Sparkles, Users, Award, BookOpen, X, Check } from 'lucide-react';

interface CardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardSelected: (eliminatedCount: number) => void;
}

export const CardsModal: React.FC<CardsModalProps> = ({ isOpen, onClose, onCardSelected }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [cards] = useState(() => {
    // 4 cards: Rei (0), As (1), 2 (2), 3 (3) shuffled
    const deck = [
      { name: 'Rei de Copas', eliminations: 0, desc: 'Nenhuma eliminada' },
      { name: 'Ás de Espadas', eliminations: 1, desc: '1 alternativa eliminada' },
      { name: '2 de Paus', eliminations: 2, desc: '2 alternativas eliminadas' },
      { name: '3 de Ouros', eliminations: 3, desc: '3 alternativas eliminadas!' },
    ];
    return deck.sort(() => Math.random() - 0.5);
  });

  if (!isOpen) return null;

  const handlePick = (idx: number) => {
    if (revealed) return;
    setSelectedIdx(idx);
    setRevealed(true);
    setTimeout(() => {
      onCardSelected(cards[idx].eliminations);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-slate-900 to-indigo-950 p-6 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 mb-2 border border-amber-500/40">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold tracking-wide text-amber-300">Cartas do Mestre</h3>
          <p className="text-sm text-slate-300 mt-1">
            Escolha uma das 4 cartas secretas para eliminar opções incorretas!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
          {cards.map((card, idx) => {
            const isPicked = selectedIdx === idx;
            return (
              <button
                key={idx}
                disabled={revealed}
                onClick={() => handlePick(idx)}
                className={`relative aspect-[2/3] rounded-xl border-2 transition-all duration-500 transform ${
                  revealed && isPicked
                    ? 'border-amber-400 bg-amber-500/20 scale-105 shadow-lg shadow-amber-500/30'
                    : 'border-amber-500/50 bg-gradient-to-br from-indigo-900 to-slate-900 hover:border-amber-400 hover:scale-105 active:scale-95'
                } flex flex-col items-center justify-center p-3 text-center`}
              >
                {revealed && (isPicked || selectedIdx !== null) ? (
                  <div className="flex flex-col items-center animate-fadeIn">
                    <span className="text-2xl mb-1">{card.eliminations === 0 ? '👑' : '🃏'}</span>
                    <span className="text-xs font-bold text-amber-300">{card.name}</span>
                    <span className="text-[11px] font-semibold text-emerald-400 mt-1">
                      -{card.eliminations} {card.eliminations === 1 ? 'opção' : 'opções'}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border border-amber-400/50 flex items-center justify-center text-amber-400 font-bold mb-2">
                      ?
                    </div>
                    <span className="text-xs font-semibold text-slate-300">Carta {idx + 1}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {revealed && selectedIdx !== null && (
          <div className="text-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm animate-fadeIn">
            Você tirou: <span className="font-bold text-white">{cards[selectedIdx].name}</span>! {cards[selectedIdx].desc}.
          </div>
        )}
      </div>
    </div>
  );
};

interface GuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  correctIndex: number;
  options: [string, string, string, string];
}

export const GuestsModal: React.FC<GuestsModalProps> = ({
  isOpen,
  onClose,
  correctIndex,
  options,
}) => {
  const [percentages] = useState(() => {
    // Generate realistic percentages favoring the correct answer
    const letters = ['A', 'B', 'C', 'D'];
    const pCorrect = Math.floor(Math.random() * 25) + 55; // 55% to 79%
    const remainder = 100 - pCorrect;
    const p1 = Math.floor(Math.random() * (remainder - 8)) + 3;
    const p2 = Math.floor(Math.random() * (remainder - p1 - 4)) + 2;
    const p3 = remainder - p1 - p2;

    const wrongPercentages = [p1, p2, p3];
    let wIdx = 0;
    return letters.map((_, i) => {
      if (i === correctIndex) return pCorrect;
      return wrongPercentages[wIdx++];
    });
  });

  if (!isOpen) return null;

  const letterLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl border-2 border-blue-400 bg-gradient-to-b from-slate-900 to-blue-950 p-6 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-blue-500/20 text-blue-400 mb-2 border border-blue-500/40">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold tracking-wide text-blue-300">Estudiosos da Bíblia</h3>
          <p className="text-sm text-slate-300 mt-1">
            Consultamos os universitários e estudiosos de teologia. Veja o percentual de votos:
          </p>
        </div>

        <div className="space-y-3 my-4">
          {letterLabels.map((letter, idx) => {
            const pct = percentages[idx];
            const isHighest = pct === Math.max(...percentages);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm font-semibold">
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600/60 flex items-center justify-center text-xs text-white">
                      {letter}
                    </span>
                    <span className="truncate max-w-[220px] text-slate-200">{options[idx]}</span>
                  </span>
                  <span className={isHighest ? 'text-amber-300 font-bold' : 'text-slate-300'}>
                    {pct}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isHighest
                        ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold tracking-wide shadow-lg shadow-blue-900/40 transition active:scale-98"
        >
          Entendido, voltar à pergunta!
        </button>
      </div>
    </div>
  );
};

interface EldersModalProps {
  isOpen: boolean;
  onClose: () => void;
  correctIndex: number;
  options: [string, string, string, string];
}

export const EldersModal: React.FC<EldersModalProps> = ({
  isOpen,
  onClose,
  correctIndex,
  options,
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  const [elders] = useState(() => {
    // 3 elders: 2 or 3 of them pick the correct answer
    const pick1 = correctIndex;
    const pick2 = Math.random() > 0.3 ? correctIndex : (correctIndex + 1) % 4;
    const pick3 = correctIndex;
    return [
      { name: 'Irmão Barnabé', role: 'Ancião de Ensino', vote: letters[pick1], option: options[pick1] },
      { name: 'Presbítero Gamaliel', role: 'Professor Bíblico', vote: letters[pick2], option: options[pick2] },
      { name: 'Anciã Débora', role: 'Líder de Oração', vote: letters[pick3], option: options[pick3] },
    ];
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl border-2 border-emerald-400 bg-gradient-to-b from-slate-900 to-teal-950 p-6 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-2 border border-emerald-500/40">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold tracking-wide text-emerald-300">Placas dos Anciãos</h3>
          <p className="text-sm text-slate-300 mt-1">
            Três líderes experientes na Palavra levantaram suas placas:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          {elders.map((elder, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-slate-800/80 border border-emerald-500/30 rounded-xl p-3 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md shadow-amber-500/30 border-2 border-white mb-2">
                {elder.vote}
              </div>
              <span className="font-bold text-sm text-emerald-200">{elder.name}</span>
              <span className="text-[11px] text-slate-400">{elder.role}</span>
              <span className="text-[11px] font-semibold text-slate-300 mt-1 truncate max-w-full">
                "{elder.option}"
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold tracking-wide shadow-lg shadow-emerald-900/40 transition active:scale-98"
        >
          Agradecer conselho e voltar
        </button>
      </div>
    </div>
  );
};

interface StudyFeedbackModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  questionText: string;
  correctAnswerText: string;
  biblicalReference: string;
  explanation: string;
  curiosity?: string;
  rewardEarned: number;
  onNext: () => void;
}

export const StudyFeedbackModal: React.FC<StudyFeedbackModalProps> = ({
  isOpen,
  isCorrect,
  questionText,
  correctAnswerText,
  biblicalReference,
  explanation,
  curiosity,
  rewardEarned,
  onNext,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative w-full max-w-lg rounded-2xl border-2 ${
          isCorrect ? 'border-emerald-400 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950' : 'border-rose-400 bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950'
        } p-6 text-white shadow-2xl max-h-[90vh] overflow-y-auto`}
      >
        <div className="text-center mb-4">
          <div
            className={`inline-flex p-3 rounded-full mb-2 border ${
              isCorrect ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
            }`}
          >
            {isCorrect ? <Check className="w-8 h-8" /> : <BookOpen className="w-8 h-8" />}
          </div>
          <h3 className={`text-2xl font-black tracking-wide ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
            {isCorrect ? 'Certa Resposta! Glória a Deus!' : 'Resposta Incorreta! Vamos Aprender!'}
          </h3>
          <p className="text-xs text-amber-300 font-bold uppercase tracking-widest mt-1">
            {isCorrect ? `+${rewardEarned.toLocaleString('pt-BR')} Bênçãos Acumuladas` : 'A Palavra de Deus nos Ensina'}
          </p>
        </div>

        <div className="space-y-4 text-left">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Pergunta:</span>
            <p className="text-sm font-semibold text-slate-200">{questionText}</p>
            <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center gap-2">
              <span className="text-xs text-slate-400">Resposta Correta:</span>
              <span className="text-xs font-bold text-emerald-400">{correctAnswerText}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Referência Bíblica: {biblicalReference}</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{explanation}</p>
          </div>

          {curiosity && (
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-300">
              <span className="font-bold text-blue-300 block mb-0.5">💡 Curiosidade Bíblica:</span>
              {curiosity}
            </div>
          )}
        </div>

        <button
          onClick={onNext}
          className={`w-full mt-6 py-3.5 rounded-xl text-white font-black text-base tracking-wide shadow-lg transition active:scale-98 ${
            isCorrect
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-900/50'
              : 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 shadow-slate-900/50'
          }`}
        >
          {isCorrect ? 'Avançar para o Próximo Nível →' : 'Ver Resultado da Partida →'}
        </button>
      </div>
    </div>
  );
};
