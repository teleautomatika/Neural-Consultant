import React from 'react';

interface ResponseDisplayProps {
  response: string;
}

export function ResponseDisplay({ response }: ResponseDisplayProps) {
  if (!response) return null;
  
  return (
    <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
      <pre className="whitespace-pre-wrap font-sans">{response}</pre>
    </div>
  );
}