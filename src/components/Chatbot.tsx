'use client';
import React, { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('채팅 오류:', error);
      // 오류 처리 로직 (예: 사용자에게 오류 메시지 표시)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col border py-24">
      {messages.map((m, index) => (
        <div key={index} className="whitespace-pre-wrap text-white">
          {m.role === 'user' ? '너: ' : '안성재: '}
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 text-primary shadow-xl"
          value={input}
          placeholder="평가받을 음식을 입력해주세요."
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
      {isLoading && <div className="text-center">안성재 쉐프가 평가 중</div>}
    </div>
  );
}
