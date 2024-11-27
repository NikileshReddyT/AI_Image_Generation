import React from 'react';
import { ImageIcon, RefreshCw } from 'lucide-react';
import { LoadingAnimation } from './LoadingAnimation';

interface ImageDisplayProps {
  imageUrl: string;
  isLoading: boolean;
  onRegenerate: () => void;
}

export function ImageDisplay({ imageUrl, isLoading, onRegenerate }: ImageDisplayProps) {
  if (isLoading) {
    return (
      <div className="aspect-video flex items-center justify-center bg-gray-50">
        <LoadingAnimation />
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="relative group">
        <img
          src={imageUrl}
          alt="Generated artwork"
          className="w-full h-[480px] object-cover"
          loading="eager"
          crossOrigin="anonymous"
        />
        <button
          onClick={onRegenerate}
          className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
          title="Generate new image"
        >
          <RefreshCw className="w-5 h-5 text-indigo-600" />
        </button>
      </div>
    );
  }

  return (
    <div className="h-[480px] flex flex-col items-center justify-center bg-gray-50 text-gray-400">
      <ImageIcon className="w-12 h-12 mb-2" />
      <p>Your generated image will appear here</p>
    </div>
  );
}