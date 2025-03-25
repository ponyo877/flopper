import { useState } from 'react';
import { GameState, Player, Card, GamePhase } from '../types/game';
import { calculateWinProbability, initializeDeck, shuffleDeck, evaluateHand, compareHands } from '../utils/pokerLogic';

const initialGameState: GameState = {
  phase: 'waiting',
  players: [],
  communityCards: Array(5).fill({ suit: 'hearts', rank: '2', revealed: false }),
  deck: [],
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: name || `Player ${gameState.players.length + 1}`,
      hand: [
        { suit: 'hearts', rank: '2', revealed: false },
        { suit: 'hearts', rank: '2', revealed: false },
      ],
      winProbability: 0,
    };

    setGameState(prev => ({
      ...prev,
      players: [...prev.players, newPlayer],
      phase: prev.players.length === 0 ? 'waiting' : 'waiting',
    }));
  };

  const startPreflop = () => {
    const deck = shuffleDeck(initializeDeck());
    const players = gameState.players.map(player => {
      const hand = [
        { ...deck.pop()!, revealed: true },
        { ...deck.pop()!, revealed: true }
      ] as [Card, Card];
      
      return {
        ...player,
        hand,
        winProbability: calculateWinProbability({ ...player, hand }, {
          ...gameState,
          deck,
          communityCards: Array(5).fill({ suit: 'hearts', rank: '2', revealed: false })
        })
      };
    });

    setGameState(prev => ({
      ...prev,
      phase: 'preflop',
      deck,
      players,
      communityCards: Array(5).fill({ suit: 'hearts', rank: '2', revealed: false })
    }));
  };

  const proceedToFlop = () => {
    const communityCards = [...gameState.communityCards];
    for (let i = 0; i < 3; i++) {
      communityCards[i] = { ...gameState.deck.pop()!, revealed: true };
    }

    const players = gameState.players.map(player => ({
      ...player,
      winProbability: calculateWinProbability(player, {
        ...gameState,
        communityCards,
        deck: [...gameState.deck]
      })
    }));

    setGameState(prev => ({
      ...prev,
      phase: 'flop',
      communityCards,
      players,
      deck: [...prev.deck]
    }));
  };

  const proceedToTurn = () => {
    const communityCards = [...gameState.communityCards];
    communityCards[3] = { ...gameState.deck.pop()!, revealed: true };

    const players = gameState.players.map(player => ({
      ...player,
      winProbability: calculateWinProbability(player, {
        ...gameState,
        communityCards,
        deck: [...gameState.deck]
      })
    }));

    setGameState(prev => ({
      ...prev,
      phase: 'turn',
      communityCards,
      players,
      deck: [...prev.deck]
    }));
  };

  const proceedToRiver = () => {
    const communityCards = [...gameState.communityCards];
    communityCards[4] = { ...gameState.deck.pop()!, revealed: true };

    const players = gameState.players.map(player => ({
      ...player,
      winProbability: calculateWinProbability(player, {
        ...gameState,
        communityCards,
        deck: [...gameState.deck]
      })
    }));

    setGameState(prev => ({
      ...prev,
      phase: 'river',
      communityCards,
      players,
      deck: [...prev.deck]
    }));
  };

  const showResults = () => {
    // 全プレイヤーの役を評価
    const playersWithHands = gameState.players.map(player => {
      const allCards = [...player.hand, ...gameState.communityCards.filter(c => c.revealed)];
      return {
        ...player,
        handStrength: evaluateHand(allCards)
      };
    });

    // 役の強さでソート
    const sortedPlayers = [...playersWithHands].sort((a, b) => {
      const result = compareHands(a.handStrength, b.handStrength);
      // 同じ役の場合はランダム (後で詳細な比較を実装)
      return result !== 0 ? result : Math.random() - 0.5;
    });

    // 順位を設定
    const playersWithPosition = sortedPlayers.map((player, index) => ({
      ...player,
      position: index + 1
    }));

    setGameState(prev => ({
      ...prev,
      phase: 'showdown',
      players: playersWithPosition
    }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  return {
    gameState,
    addPlayer,
    startPreflop,
    proceedToFlop,
    proceedToTurn,
    proceedToRiver,
    showResults,
    resetGame,
  };
};
