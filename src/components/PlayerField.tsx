import { useGameState } from '../hooks/useGameState';
import Player from './Player';
import { useState } from 'react';

const PlayerField = () => {
  const { gameState, addPlayer } = useGameState();
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName.trim() || gameState.players.length === 0) {
      addPlayer(newPlayerName);
      setNewPlayerName('');
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {gameState.players.map(player => (
          <Player key={player.id} player={player} gameState={gameState} />
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="プレイヤー名を入力"
          className="px-4 py-2 rounded bg-gray-700 text-white"
        />
        <button
          onClick={handleAddPlayer}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          プレイヤー追加
        </button>
      </div>
    </div>
  );
};

export default PlayerField;
