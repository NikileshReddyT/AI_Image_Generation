import React from 'react';
import { SendHorizontal } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function PromptInput({ prompt, isLoading, onChange, onSubmit }: PromptInputProps) {
  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe the image you want to create..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition pr-12 bg-white/80 backdrop-blur-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-600 hover:text-indigo-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}