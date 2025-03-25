import { Player as PlayerType, GameState } from '../types/game';
import Card from './Card';
import WinProbability from './WinProbability';
import { useState } from 'react';

interface PlayerProps {
  player: PlayerType;
  gameState: GameState;
}

const Player = ({ player, gameState }: PlayerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(player.name);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    // TODO: 名前を更新するロジックを追加
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <div className="mb-4">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            autoFocus
            className="w-full bg-gray-600 text-white px-2 py-1 rounded"
          />
        ) : (
          <h3 
            onClick={handleNameClick}
            className="text-xl font-bold cursor-pointer hover:text-blue-400 transition"
          >
            {name}
          </h3>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        {player.hand.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>

      <WinProbability probability={player.winProbability} />

      {player.position && gameState.phase === 'showdown' && (
        <div className="mt-4 flex justify-center">
          {player.position === 1 ? (
            <div className="text-3xl text-yellow-400">🏆 1位</div>
          ) : player.position === 2 ? (
            <div className="text-2xl text-gray-300">🥈 2位</div>
          ) : player.position === 3 ? (
            <div className="text-2xl text-amber-600">🥉 3位</div>
          ) : (
            <div className="text-xl text-gray-400">😢 {player.position}位</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Player;
