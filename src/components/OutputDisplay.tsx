import React from 'react';

interface OutputDisplayProps {
  response: string;
}

export function OutputDisplay({ response }: OutputDisplayProps) {
  if (!response) return null;

  return (
    <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
      <div className="prose prose-invert max-w-none">
        {response.split('\n').map((line, i) => (
          <p key={i} className="mb-4 last:mb-0">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}