'use client';

import React from 'react';
import Button from '@/components/Button';
import { JudgeSelector } from './JudgeSelector';
import useModal from '@/lib/hooks/useModal';
import ResultModal from './ResultModal';
import { useFoodEvaluator } from '@/lib/hooks/useFoodEvaluator';
import { LoadingSpinner } from './LoadingSpinner';

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

  const { openModal, closeModal, ModalPortal } = useModal();

  const handleEvaluateAndOpenModal = async () => {
    await handleEvaluate();
    if (!error) {
      openModal();
    }
  };

  const handleCloseAndRefresh = () => {
    closeModal();
    handleRefresh();
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col space-y-4 p-4">
      <JudgeSelector selectedJudge={selectedJudge} onJudgeSelect={handleJudgeSelect} />
      <input
        type="text"
        value={food}
        onChange={handleInputChange}
        placeholder="평가받을 음식을 입력해주세요."
        className="w-full rounded-full border-2 border-gray-300 bg-primary px-10 py-2 text-center font-bold text-white"
      />
      <Button
        label="평가하기"
        type="button"
        onClick={handleEvaluateAndOpenModal}
        disabled={isLoading}
        className="border-white bg-tertiary font-bold text-primary"
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
