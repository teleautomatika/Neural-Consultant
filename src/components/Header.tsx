import React from 'react';
import { Brain } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center py-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Brain className="w-12 h-12 text-cyan-400" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          Neural Assistant
        </h1>
      </div>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Powered by NVIDIA's advanced AI models, ready to assist with any task
      </p>
    </header>
  );
}