import Chatbot from '@/components/Chatbot';
import Title from '@/components/Title';

export default function Home() {
  return (
    <div className="flex-grow bg-primary">
      <main className="">
        <Title />
        <Chatbot />
      </main>
      <footer className=""></footer>
    </div>
  );
}
