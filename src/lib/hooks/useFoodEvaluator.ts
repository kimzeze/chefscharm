// useFoodEvaluator.ts
import { useState } from 'react';

interface EvaluationResult {
  food: string;
  evaluation: string;
}

type Judge = 'anSungJae' | 'baekJongWon';

export function useFoodEvaluator() {
  const [food, setFood] = useState('');
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedJudge, setSelectedJudge] = useState<Judge>('anSungJae');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFood(e.target.value);
  };

  const handleJudgeSelect = (judge: Judge) => {
    setSelectedJudge(judge);
  };

  const handleEvaluate = async () => {
    if (!food.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: food }],
          judge: selectedJudge,
        }),
      });
      if (!response.ok) {
        throw new Error(`서버 응답 오류: ${response.status}`);
      }
      const data = await response.json();
      setResult({ food, evaluation: data.response });
    } catch (error) {
      console.error('평가 오류:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setFood('');
    setResult(null);
    setError(null);
  };

  return {
    food,
    result,
    isLoading,
    error,
    selectedJudge,
    handleInputChange,
    handleJudgeSelect,
    handleEvaluate,
    handleRefresh,
  };
}
