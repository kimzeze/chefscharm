import React from 'react';

interface EvaluationResultProps {
  food: string;
  evaluation: string;
}

export function EvaluationResult({ food, evaluation }: EvaluationResultProps) {
  return (
    <div className="max-w-[600px] rounded-2xl border-2 border-tertiary bg-primary p-4 text-white">
      {/* <h3 className="mb-2 font-bold text-white">{food} 심사 결과:</h3> */}
      <p className="text-md font-medium">{evaluation}</p>
    </div>
  );
}
