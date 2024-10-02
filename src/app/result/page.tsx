// app/result/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EvaluationResult } from '@/components/EvaluationResult';
import Image from 'next/image';
import Button from '@/components/Button';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<{ food: string; evaluation: string } | null>(null);
  const [selectedJudge, setSelectedJudge] = useState<'anSungJae' | 'baekJongWon'>('anSungJae');

  useEffect(() => {
    // 로컬 스토리지에서 결과와 선택된 심사위원 정보를 가져옵니다.
    const storedResult = localStorage.getItem('evaluationResult');
    const storedJudge = localStorage.getItem('selectedJudge') as 'anSungJae' | 'baekJongWon';

    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    if (storedJudge) {
      setSelectedJudge(storedJudge);
    }

    // 컴포넌트가 언마운트될 때 로컬 스토리지를 정리합니다.
    return () => {
      localStorage.removeItem('evaluationResult');
      localStorage.removeItem('selectedJudge');
    };
  }, []);

  const handleClose = () => {
    router.push('/');
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
      <div className="flex w-full max-w-[480px] flex-col items-center px-4">
        <div className="w-full text-center">
          {/* 심사위원 이미지 */}
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
          <EvaluationResult food={result.food} evaluation={result.evaluation} />
        </div>
        <Button
          label="다시 평가하기"
          type="button"
          onClick={handleClose}
          className="mt-4 border-white bg-primary font-bold text-tertiary"
        />
      </div>
    </div>
  );
}
