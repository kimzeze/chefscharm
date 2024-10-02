// FoodEvaluator.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Button from '@/components/Button';
import { JudgeSelector } from './JudgeSelector';
import { useFoodEvaluator } from '@/lib/hooks/useFoodEvaluator';
import { LoadingSpinner } from './LoadingSpinner';

export default function FoodEvaluator() {
  const router = useRouter();
  const { food, setFood, result, isLoading, error, selectedJudge, handleJudgeSelect, handleEvaluate } =
    useFoodEvaluator();

  useEffect(() => {
    if (result) {
      // 결과를 로컬 스토리지에 저장
      localStorage.setItem('evaluationResult', JSON.stringify(result));
      localStorage.setItem('selectedJudge', selectedJudge);
      // 결과 페이지로 이동
      router.push('/result');
    }
  }, [result, selectedJudge, router]);

  const handleEvaluateAndNavigate = () => {
    if (food.trim().length === 0 || isLoading) {
      return;
    }
    handleEvaluate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEvaluateAndNavigate();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col space-y-4 p-4">
      <JudgeSelector selectedJudge={selectedJudge} onJudgeSelect={handleJudgeSelect} />
      <input
        type="text"
        value={food}
        onChange={(e) => setFood(e.target.value.slice(0, 10))}
        onKeyDown={handleKeyDown}
        placeholder="평가받을 음식을 입력해주세요 (10자 이내)"
        className="w-full rounded-full border-2 border-gray-300 bg-primary px-10 py-2 text-center font-bold text-white"
        maxLength={10}
      />
      <Button
        label="평가하기"
        type="button"
        onClick={handleEvaluateAndNavigate}
        disabled={isLoading || food.trim().length === 0}
        className="border-white bg-tertiary font-bold text-primary disabled:opacity-50"
      />
      {error && <div className="rounded bg-red-100 p-2 text-center text-red-500">오류: {error}</div>}
      {isLoading && <LoadingSpinner selectedJudge={selectedJudge} />}
    </div>
  );
}
