import { useState } from 'react';

interface EvaluationResult {
  food: string;
  evaluation: string;
}

type Judge = 'anSungJae' | 'baekJongWon';

// 한글 조사 처리 함수
const getKoreanParticle = (word: string, particle1: string, particle2: string) => {
  const lastChar = word.charAt(word.length - 1);
  const unicode = lastChar.charCodeAt(0);

  // 한글 유니코드 범위
  if (unicode < 0xac00 || unicode > 0xd7a3) {
    return particle1; // 한글이 아닌 경우 기본값 반환
  }

  // 받침 있음 (true) / 없음 (false)
  return (unicode - 0xac00) % 28 > 0 ? particle1 : particle2;
};

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

    if (selectedJudge === 'baekJongWon') {
      // 백종원 버전일 때는 API 호출 없이 직접 결과 설정
      const particle = getKoreanParticle(food, '이', '');
      setResult({
        food,
        evaluation: `으ㅇ게옑? 이게 워에유 이ㄱㅔ 와..움...어얽 ㅡㄱㅓ걱,, 머ㅇ엉억 오옹? 오고옥 흐응?… 오옥 웅,ㅁ음? 오옥? ${food}${particle}잖아? 참ㄴㅏ 이거 사람 깜짝 놀래키네`,
      });
      setIsLoading(false);
    } else {
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
    }
  };

  const handleRefresh = () => {
    setFood('');
    setResult(null);
    setError(null);
  };

  return {
    food,
    setFood,
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
