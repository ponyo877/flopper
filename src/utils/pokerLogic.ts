import { Player, GameState, Card, CardSuit, CardRank, PokerHand } from '../types/game';

// ダミーの勝率計算関数（後で実装）
export const calculateWinProbability = (
  player: Player,
  gameState: GameState
): number => {
  // TODO: 実際の勝率計算ロジックを実装
  // 現在はランダムな値を返す
  return Math.random();
};

// デッキを初期化する関数
export const initializeDeck = (): Card[] => {
  const suits: CardSuit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks: CardRank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank, revealed: false });
    }
  }
  return deck;
};

// デッキをシャッフルする関数
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 役を評価する関数
export const evaluateHand = (cards: Card[]): PokerHand => {
  const ranks = cards.map(card => card.rank);
  const suits = cards.map(card => card.suit);

  // 同じランクのカードをグループ化
  const rankGroups: Record<CardRank, number> = {
    '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0,
    '9': 0, '10': 0, 'J': 0, 'Q': 0, 'K': 0, 'A': 0
  };
  
  ranks.forEach(rank => rankGroups[rank]++);

  const groups = Object.values(rankGroups).filter(count => count > 0);
  const maxSameRank = Math.max(...groups);

  // フラッシュ判定 (すべて同じスート)
  const isFlush = suits.every(suit => suit === suits[0]);

  // ストレート判定
  const rankOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const sortedRanks = [...new Set(ranks)].sort((a, b) => 
    rankOrder.indexOf(a) - rankOrder.indexOf(b)
  );
  
  let isStraight = false;
  if (sortedRanks.length >= 5) {
    for (let i = 0; i <= sortedRanks.length - 5; i++) {
      if (rankOrder.indexOf(sortedRanks[i+4]) - rankOrder.indexOf(sortedRanks[i]) === 4) {
        isStraight = true;
        break;
      }
    }
  }

  // ロイヤルストレートフラッシュ
  if (isFlush && isStraight && sortedRanks.includes('A') && sortedRanks.includes('K')) {
    return 'royal_flush';
  }

  // ストレートフラッシュ
  if (isFlush && isStraight) {
    return 'straight_flush';
  }

  // フォーカード
  if (maxSameRank === 4) {
    return 'four_of_a_kind';
  }

  // フルハウス
  if (maxSameRank === 3 && groups.includes(2)) {
    return 'full_house';
  }

  // フラッシュ
  if (isFlush) {
    return 'flush';
  }

  // ストレート
  if (isStraight) {
    return 'straight';
  }

  // スリーカード
  if (maxSameRank === 3) {
    return 'three_of_a_kind';
  }

  // ツーペア
  if (groups.filter(count => count === 2).length >= 2) {
    return 'two_pair';
  }

  // ワンペア
  if (maxSameRank === 2) {
    return 'one_pair';
  }

  // ハイカード
  return 'high_card';
};

// 役の強さを比較する関数
export const compareHands = (a: PokerHand, b: PokerHand): number => {
  const handStrength: Record<PokerHand, number> = {
    'royal_flush': 10,
    'straight_flush': 9,
    'four_of_a_kind': 8,
    'full_house': 7,
    'flush': 6,
    'straight': 5,
    'three_of_a_kind': 4,
    'two_pair': 3,
    'one_pair': 2,
    'high_card': 1
  };

  return handStrength[b] - handStrength[a];
};
