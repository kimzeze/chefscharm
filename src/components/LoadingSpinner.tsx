import Image from 'next/image';

interface LoadingSpinnerProps {
  selectedJudge: 'anSungJae' | 'baekJongWon';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ selectedJudge }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="text-center">
        <div className="relative mx-auto mb-4 h-80 w-80">
          <Image
            src={selectedJudge === 'anSungJae' ? '/assets/ahn.png' : '/assets/baek.png'}
            alt={`${selectedJudge === 'anSungJae' ? '안성재' : '백종원'} 이미지`}
            fill
            sizes="(max-width: 480px) 100vw, 480px"
            style={{ objectFit: 'contain' }}
            priority
            className="animate-pulse rounded-lg"
          />
        </div>
        <p className="text-xl font-bold text-white">평가중...</p>
      </div>
    </div>
  );
};
