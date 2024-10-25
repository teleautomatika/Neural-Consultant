import React, { useState } from 'react';
import { generateResponse } from './lib/nvidia';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { DecorativeElements } from './components/DecorativeElements';
import { Brain } from 'lucide-react';
import { Message } from './lib/types';
import './styles/grid-pattern.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');

  const handleSend = async (content: string) => {
    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { role: 'user', content }]);
      setCurrentResponse('');

      const response = await generateResponse(content, (chunk) => {
        setCurrentResponse(chunk);
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.content 
      }]);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
      setCurrentResponse('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DecorativeElements />
      
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        <div className="flex items-center gap-3 mb-8">
          <Brain className="w-8 h-8 text-cyan-500" />
          <h1 className="text-2xl font-bold">Neural Assistant</h1>
        </div>

        <div className="space-y-4 mb-8">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
          {currentResponse && (
            <ChatMessage role="assistant" content={currentResponse} />
          )}
          {messages.length === 0 && !currentResponse && (
            <p className="text-center text-gray-400 py-8">
              Start a conversation with the AI assistant
            </p>
          )}
        </div>

        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;