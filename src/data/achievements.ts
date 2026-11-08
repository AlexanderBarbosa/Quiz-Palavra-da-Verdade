import { Achievement, UserProfile, MatchStats } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'Primeiro Passo na Fé',
    description: 'Responda sua primeira pergunta bíblica com sucesso.',
    icon: 'Footprints',
    condition: (user: UserProfile, stats?: MatchStats) => (stats?.questionsAnswered ?? 0) >= 1 || user.gamesPlayed >= 1
  },
  {
    id: 'david_goliath',
    title: 'Davi contra Golias',
    description: 'Vença a 5ª rodada (20.000 pontos) sem usar nenhuma ajuda.',
    icon: 'Shield',
    condition: (_user: UserProfile, stats?: MatchStats) => {
      if (!stats) return false;
      const noHelp = !stats.cardsUsed && !stats.guestsUsed && !stats.eldersUsed && stats.skipsUsed === 0;
      return stats.questionsAnswered >= 5 && noHelp;
    }
  },
  {
    id: 'solomon_wisdom',
    title: 'Sabedoria de Salomão',
    description: 'Alcance a marca de 500.000 pontos em uma única partida.',
    icon: 'Crown',
    condition: (user: UserProfile, stats?: MatchStats) => (stats?.score ?? 0) >= 500000 || user.highestScore >= 500000
  },
  {
    id: 'faith_millionaire',
    title: 'Milionário da Palavra',
    description: 'Responda a Pergunta do Milhão e conquiste o prêmio máximo de 1.000.000 de bênçãos!',
    icon: 'Sparkles',
    condition: (user: UserProfile, stats?: MatchStats) => (stats?.wonMillion ?? false) || user.millionWins >= 1
  },
  {
    id: 'devoted_disciple',
    title: 'Discípulo Fiel',
    description: 'Jogue pelo menos 5 partidas completas.',
    icon: 'HeartHandshake',
    condition: (user: UserProfile) => user.gamesPlayed >= 5
  },
  {
    id: 'scripture_scholar',
    title: 'Mestre da Palavra',
    description: 'Jogue na categoria Teólogos / Mestres e acerte pelo menos 7 perguntas.',
    icon: 'GraduationCap',
    condition: (_user: UserProfile, stats?: MatchStats) => stats?.category === 'masters' && (stats?.questionsAnswered ?? 0) >= 7
  },
  {
    id: 'youth_valiant',
    title: 'Valente de Deus',
    description: 'Vença uma partida completa na categoria Jovens.',
    icon: 'Flame',
    condition: (_user: UserProfile, stats?: MatchStats) => stats?.category === 'teens' && (stats?.wonMillion ?? false)
  },
  {
    id: 'little_disciple',
    title: 'Pequeno Samuel',
    description: 'Complete uma rodada brilhante na categoria Infantil.',
    icon: 'Smile',
    condition: (_user: UserProfile, stats?: MatchStats) => stats?.category === 'kids' && (stats?.questionsAnswered ?? 0) >= 5
  },
  {
    id: 'grand_accumulated',
    title: 'Tesouro Celestial',
    description: 'Acumule mais de 2.000.000 de pontos totais no seu histórico.',
    icon: 'Coins',
    condition: (user: UserProfile) => user.totalScore >= 2000000
  }
];

export function calculateSpiritualLevel(totalScore: number): string {
  if (totalScore >= 5000000) return 'Apóstolo da Fé';
  if (totalScore >= 3000000) return 'Mestre das Escrituras';
  if (totalScore >= 1500000) return 'Guerreiro da Oração';
  if (totalScore >= 800000) return 'Levita Louvador';
  if (totalScore >= 300000) return 'Discípulo Dedicado';
  if (totalScore >= 100000) return 'Aprendiz dos Evangelhos';
  return 'Buscador da Verdade';
}

export function checkNewAchievements(user: UserProfile, stats: MatchStats): string[] {
  const newlyUnlocked: string[] = [];
  const currentSet = new Set(user.unlockedAchievements);

  ACHIEVEMENTS.forEach(ach => {
    if (!currentSet.has(ach.id) && ach.condition(user, stats)) {
      newlyUnlocked.push(ach.id);
    }
  });

  return newlyUnlocked;
}
