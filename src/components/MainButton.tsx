import { useGameState } from '../hooks/useGameState';

const MainButton = () => {
  const {
    gameState,
    startPreflop,
    proceedToFlop,
    proceedToTurn,
    proceedToRiver,
    showResults,
    resetGame
  } = useGameState();

  const getButtonConfig = () => {
    switch (gameState.phase) {
      case 'waiting':
        return {
          text: 'プリフロップ開始',
          onClick: startPreflop,
          disabled: gameState.players.length < 1
        };
      case 'preflop':
        return {
          text: 'フロップを開く',
          onClick: proceedToFlop,
          disabled: false
        };
      case 'flop':
        return {
          text: 'ターンを開く',
          onClick: proceedToTurn,
          disabled: false
        };
      case 'turn':
        return {
          text: 'リバーを開く',
          onClick: proceedToRiver,
          disabled: false
        };
      case 'river':
        return {
          text: '結果を表示',
          onClick: showResults,
          disabled: false
        };
      case 'showdown':
        return {
          text: '再プレイ',
          onClick: resetGame,
          disabled: false
        };
      default:
        return {
          text: 'ゲーム開始',
          onClick: startPreflop,
          disabled: true
        };
    }
  };

  const { text, onClick, disabled } = getButtonConfig();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg text-lg font-bold ${
        disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      } transition-colors`}
    >
      {text}
    </button>
  );
};

export default MainButton;
