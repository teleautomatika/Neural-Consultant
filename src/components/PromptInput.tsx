import React from 'react';
import { Send } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function PromptInput({ prompt, setPrompt, onSubmit, isLoading }: PromptInputProps) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full p-4 pr-12 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none text-white resize-none min-h-[100px]"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="absolute right-4 bottom-4 p-2 rounded-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}