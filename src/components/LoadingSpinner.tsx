import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
    </div>
  );
}