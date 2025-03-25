import './index.css';
import { useGameState } from './hooks/useGameState';
import DealerField from './components/DealerField';
import PlayerField from './components/PlayerField';
import MainButton from './components/MainButton';

function App() {
  const { gameState } = useGameState();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center">テキサスホールデムポーカー</h1>
        
        <DealerField />
        
        <PlayerField />
        
        <div className="flex justify-center mt-8">
          <MainButton />
        </div>
      </div>
    </div>
  );
}

export default App;
