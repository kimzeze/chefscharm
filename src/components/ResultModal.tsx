'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { EvaluationResult } from './EvaluationResult';

interface ResultModalProps {
  closeModal: () => void;
  result: { food: string; evaluation: string } | null;
  isLoading: boolean;
  selectedJudge: 'anSungJae' | 'baekJongWon';
}

export default function ResultModal({ closeModal, result, isLoading, selectedJudge }: ResultModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    closeModal(); // This will now trigger handleCloseAndRefresh in FoodEvaluator
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          role="dialog"
          aria-modal="true"
          aria-labelledby="result-title"
        >
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            onClick={handleClose}
            className="absolute right-4 top-4"
            aria-label="결과 창 닫기"
          >
            <Image src="/assets/close-button.svg" alt="닫기" width={30} height={30} />
          </motion.button>
          <div className="flex w-full max-w-[480px] flex-col items-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="w-full text-center"
            >
              <div className="relative w-full" style={{ aspectRatio: '600/400' }}>
                <Image
                  src={selectedJudge === 'anSungJae' ? '/assets/ahn.png' : '/assets/baek.png'}
                  alt={`${selectedJudge === 'anSungJae' ? '안성재' : '백종원'} 이미지`}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 480px) 100vw, 480px"
                  priority
                  className="rounded-lg"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-4 w-full"
            >
              {isLoading && <div className="text-center font-bold text-white">평가 중...</div>}
              {result && <EvaluationResult food={result.food} evaluation={result.evaluation} />}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
