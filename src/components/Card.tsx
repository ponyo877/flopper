import { Card as CardType } from '../types/game';

interface CardProps {
  card: CardType;
}

const Card = ({ card }: CardProps) => {
  if (!card.revealed) {
    return (
      <div className="w-16 h-24 bg-red-600 rounded-md flex items-center justify-center border-2 border-white">
        <div className="text-white text-2xl">🃏</div>
      </div>
    );
  }

  const suitColor = card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-red-500' : 'text-black';
  const suitSymbol = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  }[card.suit];

  return (
    <div className="w-16 h-24 bg-white rounded-md flex flex-col items-center justify-center border-2 border-gray-300 shadow-md">
      <div className={`text-xl font-bold ${suitColor}`}>
        {card.rank}
      </div>
      <div className={`text-2xl ${suitColor}`}>
        {suitSymbol}
      </div>
    </div>
  );
};

export default Card;
