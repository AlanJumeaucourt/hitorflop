import React from 'react';

interface PredictionProps {
  prediction: string;
  children: React.ReactNode;
}

function Prediction({ prediction, children }: PredictionProps) {
  if (!prediction) return null;

  return (
    <div className="mt-6 text-center">
      <div className="inline-flex items-center justify-center space-x-4 bg-gray-900/50 px-6 py-4 rounded-full">
        {children}
        <span className="text-2xl font-bold">
          {prediction === 'HIT' ? (
            <span className="text-yellow-400">It's a HIT! 🏆</span>
          ) : (
            <span className="text-red-400">It's a FLOP 👎</span>
          )}
        </span>
      </div>
    </div>
  );
}

export default Prediction;