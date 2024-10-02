import FoodEvaluator from '@/components/FoodEvaluator';
import Title from '@/components/Title';

export default function Home() {
  return (
    <div className="flex-grow">
      <main className="">
        <Title />
        <FoodEvaluator />
      </main>
    </div>
  );
}
