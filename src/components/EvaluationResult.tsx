import React from 'react';

interface EvaluationResultProps {
  food: string;
  evaluation: string;
  onCopy: () => void;
}

export function EvaluationResult({ food, evaluation, onCopy }: EvaluationResultProps) {
  return (
    <div
      className="max-w-[600px] cursor-pointer rounded-2xl border-2 border-primary bg-primary p-4 text-white"
      onClick={onCopy}
    >
      <h3 className="mb-2 font-bold text-white">{food} 평과 결과:</h3>
      <p className="text-md font-medium">{evaluation}</p>
    </div>
  );
}
