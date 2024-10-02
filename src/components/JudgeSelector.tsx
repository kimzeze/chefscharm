import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import cn from '@/lib/utils/cn';

type Judge = 'anSungJae' | 'baekJongWon';

interface JudgeSelectorProps {
  selectedJudge: Judge;
  onJudgeSelect: (judge: Judge) => void;
}

export function JudgeSelector({ selectedJudge, onJudgeSelect }: JudgeSelectorProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <h3 className="mb-4 flex w-full items-center justify-center rounded-full border-2 border-primary bg-black p-2 text-center text-20 font-semibold text-white">
        👨🏻‍🍳 원하시는 쉐프를 선택해주세요.
      </h3>
      <div className="relative mb-4 aspect-[600/750] w-full max-w-[400px]">
        <Image
          src={selectedJudge === 'anSungJae' ? '/assets/ahn_selected.png' : '/assets/baek_selected.png'}
          alt={`${selectedJudge === 'anSungJae' ? '안성재' : '백종원'} 이미지`}
          fill
          sizes="(max-width: 400px) 100vw, 400px"
          priority
          style={{ objectFit: 'contain', borderRadius: '50%' }}
        />
      </div>

      <div className="">
        <p className="mb-4 text-18 font-semibold text-white">
          {selectedJudge === 'anSungJae' ? '"오늘 급식메뉴는 뭔가요?"' : '"뭐여 이거..."'}
        </p>
      </div>

      <div className="gap flex w-full flex-row justify-between gap-4">
        <Button
          label="안성재 VER"
          type="button"
          onClick={() => onJudgeSelect('anSungJae')}
          className={cn(selectedJudge === 'anSungJae' ? 'bg-tertiary text-primary' : 'bg-primary text-kebab')}
        />
        <Button
          label="백종원 VER"
          type="button"
          onClick={() => onJudgeSelect('baekJongWon')}
          className={cn(selectedJudge === 'baekJongWon' ? 'bg-tertiary text-primary' : 'bg-primary text-kebab')}
        />
      </div>
    </div>
  );
}
