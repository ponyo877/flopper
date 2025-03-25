export type CardSuit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type CardRank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: CardSuit;
  rank: CardRank;
  revealed: boolean;
}

export interface Player {
  id: string;
  name: string;
  hand: [Card, Card];
  winProbability: number;
  position?: number; // 1: 1位, 2: 2位...
}

export type GamePhase = 
  | 'waiting'       // プレイヤー待機中
  | 'preflop'       // プリフロップ
  | 'flop'          // フロップ
  | 'turn'          // ターン
  | 'river'         // リバー
  | 'showdown';     // 結果表示

export interface GameState {
  phase: GamePhase;
  players: Player[];
  communityCards: Card[];
  deck: Card[];
}

export type PokerHand =
  | 'royal_flush'
  | 'straight_flush'
  | 'four_of_a_kind'
  | 'full_house'
  | 'flush'
  | 'straight'
  | 'three_of_a_kind'
  | 'two_pair'
  | 'one_pair'
  | 'high_card';
