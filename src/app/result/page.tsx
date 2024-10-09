// app/result/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EvaluationResult } from '@/components/EvaluationResult';
import Image from 'next/image';
import Button from '@/components/Button';
import { toast, Toaster } from 'react-hot-toast';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<{ food: string; evaluation: string } | null>(null);
  const [selectedJudge, setSelectedJudge] = useState<'anSungJae' | 'baekJongWon'>('anSungJae');

  useEffect(() => {
    const storedResult = localStorage.getItem('evaluationResult');
    const storedJudge = localStorage.getItem('selectedJudge') as 'anSungJae' | 'baekJongWon';

    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    if (storedJudge) {
      setSelectedJudge(storedJudge);
    }

    return () => {
      localStorage.removeItem('evaluationResult');
      localStorage.removeItem('selectedJudge');
    };
  }, []);

  const handleClose = () => {
    router.push('/');
  };

  const handleCopy = () => {
    if (result) {
      const textToCopy = `${result.food} 심사 결과:\n${result.evaluation}`;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          toast.success('평가 결과가 클립보드에 복사되었습니다!');
        })
        .catch(() => {
          toast.error('클립보드 복사에 실패했습니다.');
        });
    }
  };

  if (!result) {
    return (
      <div>
        <p className="text-center font-bold text-white">서버 오류, 다시 평가해주세요!</p>
        <Button
          label="다시 평가하러가기"
          type="button"
          onClick={handleClose}
          className="mt-4 w-48 border-white bg-secondary font-bold text-primary"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <Toaster position="top-center" />
      <div className="flex w-full max-w-[480px] flex-col items-center px-4">
        <div className="w-full text-center">
          <div className="rounded-1 relative w-full border-2 border-primary" style={{ aspectRatio: '600/400' }}>
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
        </div>
        <div className="mt-4 w-full">
          <EvaluationResult food={result.food} evaluation={result.evaluation} onCopy={handleCopy} />
        </div>
        <Button
          label="결과 복사하기"
          type="button"
          onClick={handleCopy}
          className="mt-2 border-white bg-tertiary font-bold text-primary"
        />
        <Button
          label="다시 평가하기"
          type="button"
          onClick={handleClose}
          className="mb-5 mt-2 border-white bg-primary font-bold text-tertiary"
        />
      </div>
    </div>
  );
}
