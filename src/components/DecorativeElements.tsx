import React from 'react';

export function DecorativeElements() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-gray-900/50 to-purple-900/20 pointer-events-none" />
      <div className="fixed -top-1/2 -right-1/2 w-full h-full rotate-12 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-full bg-grid-pattern opacity-50 pointer-events-none" />
    </>
  );
}