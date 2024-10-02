'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { JudgeSelector } from './JudgeSelector';
import useModal from '@/lib/hooks/useModal';
import ResultModal from './ResultModal';
import { useFoodEvaluator } from '@/lib/hooks/useFoodEvaluator';
import { LoadingSpinner } from './LoadingSpinner';

export default function FoodEvaluator() {
  const { food, setFood, result, isLoading, error, selectedJudge, handleJudgeSelect, handleEvaluate, handleRefresh } =
    useFoodEvaluator();

  const { openModal, closeModal, ModalPortal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (result && !isLoading && !error) {
      openModal();
    }
  }, [result, isLoading, error, openModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, 10);
    setFood(newValue);
  };

  const handleEvaluateAndOpenModal = async () => {
    if (food.trim().length === 0 || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    await handleEvaluate();
    setIsSubmitting(false);
  };

  const handleCloseAndRefresh = () => {
    closeModal();
    handleRefresh();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEvaluateAndOpenModal();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col space-y-4 p-4">
      <JudgeSelector selectedJudge={selectedJudge} onJudgeSelect={handleJudgeSelect} />
      <input
        type="text"
        value={food}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="평가받을 음식을 입력해주세요 (10자 이내)"
        className="w-full rounded-full border-2 border-gray-300 bg-primary px-10 py-2 text-center font-bold text-white"
        maxLength={10}
      />
      <Button
        label="평가하기"
        type="button"
        onClick={handleEvaluateAndOpenModal}
        disabled={isLoading || isSubmitting || food.trim().length === 0}
        className="border-white bg-tertiary font-bold text-primary disabled:opacity-50"
      />
      {error && <div className="rounded bg-red-100 p-2 text-center text-red-500">오류: {error}</div>}
      {isLoading && <LoadingSpinner selectedJudge={selectedJudge} />}
      <ModalPortal>
        <ResultModal
          closeModal={handleCloseAndRefresh}
          result={result}
          isLoading={isLoading}
          selectedJudge={selectedJudge}
        />
      </ModalPortal>
    </div>
  );
}
