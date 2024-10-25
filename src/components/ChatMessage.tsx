import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        role === 'user' ? 'bg-cyan-500' : 'bg-purple-500'
      }`}>
        {role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      <div className={`flex-1 max-w-[80%] rounded-lg p-4 ${
        role === 'user' 
          ? 'bg-cyan-500/10 ml-auto' 
          : 'bg-purple-500/10'
      }`}>
        <p className="text-white whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}