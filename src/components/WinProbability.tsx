interface WinProbabilityProps {
  probability: number;
}

const WinProbability = ({ probability }: WinProbabilityProps) => {
  const percentage = Math.round(probability * 100);
  const progressColor = 
    percentage > 70 ? 'bg-green-500' :
    percentage > 40 ? 'bg-yellow-500' :
    'bg-red-500';

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">一位確率</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${progressColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default WinProbability;
