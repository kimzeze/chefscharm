'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import { useFoodEvaluator } from '@/lib/hooks/useFoodEvaluator';
import { JudgeSelector } from './JudgeSelector';
import { EvaluationResult } from './EvaluationResult';

export default function FoodEvaluator() {
  const {
    food,
    result,
    isLoading,
    error,
    selectedJudge,
    handleInputChange,
    handleJudgeSelect,
    handleEvaluate,
    handleRefresh,
  } = useFoodEvaluator();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col space-y-4 p-4">
      <JudgeSelector selectedJudge={selectedJudge} onJudgeSelect={handleJudgeSelect} />
      <input
        type="text"
        value={food}
        onChange={handleInputChange}
        placeholder="평가받을 음식을 입력해주세요."
        disabled={isLoading}
        className="w-full rounded-full border-2 border-gray-300 bg-primary px-10 py-2 text-center font-bold text-white"
      />
      <Button
        label="평가하기"
        type="button"
        onClick={handleEvaluate}
        disabled={isLoading}
        className="border-white bg-tertiary font-bold text-primary disabled:opacity-50"
      />
      {/* <Button
        label="새로고침"
        type="button"
        onClick={handleRefresh}
        className="border-2 border-white bg-white text-primary hover:bg-blue-50"
      /> */}
      {isLoading && (
        <div className="text-center">
          <div className="mb-2">평가 중...</div>
          <Image
            src={selectedJudge === 'anSungJae' ? '/assets/ahn.png' : '/assets/baek.png'}
            alt={`${selectedJudge === 'anSungJae' ? '안성재' : '백종원'} 이미지`}
            width={600}
            height={400}
            layout="responsive"
            priority
          />
        </div>
      )}
      {error && <div className="rounded bg-red-100 p-2 text-center text-red-500">오류: {error}</div>}
      {result && <EvaluationResult food={result.food} evaluation={result.evaluation} />}
    </div>
  );
}
