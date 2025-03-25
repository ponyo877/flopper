import { useGameState } from '../hooks/useGameState';
import Card from './Card';

const DealerField = () => {
  const { gameState } = useGameState();

  return (
    <div className="p-4 bg-gray-800 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4">コミュニティカード</h2>
      <div className="flex justify-center gap-2">
        {gameState.communityCards.map((card, index) => (
          <Card 
            key={index} 
            card={{
              ...card,
              revealed: index < 
                (gameState.phase === 'preflop' ? 0 :
                 gameState.phase === 'flop' ? 3 :
                 gameState.phase === 'turn' ? 4 :
                 gameState.phase === 'river' || gameState.phase === 'showdown' ? 5 : 0)
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default DealerField;
