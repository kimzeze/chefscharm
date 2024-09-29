import React from 'react';

interface EvaluationResultProps {
  food: string;
  evaluation: string;
}

export function EvaluationResult({ food, evaluation }: EvaluationResultProps) {
  return (
    <div className="rounded border-2 border-tertiary bg-primary p-4 text-white">
      <h3 className="font-bold text-white">{food} 심사 결과:</h3>
      <p>{evaluation}</p>
    </div>
  );
}
