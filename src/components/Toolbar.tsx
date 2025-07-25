'use client';

import React from 'react';

interface ToolbarProps {
  mode: string;
  setMode: (mode: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ mode, setMode }) => {
  const tools = [
    { icon: '✏️', label: 'draw' },
    { icon: '🖱️', label: 'move' },
    { icon: '💬', label: 'comment' },
    { icon: '❌', label: 'delete' },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {tools.map((tool) => (
        <button
          key={tool.label}
          onClick={() => setMode(tool.label)}
          className={`px-3 py-2 rounded text-xl border ${
            mode === tool.label ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
          }`}
        >
          {tool.icon}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
