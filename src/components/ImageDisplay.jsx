import React from 'react';
import { ImageIcon, RefreshCw, Download } from 'lucide-react';
import { LoadingAnimation } from './LoadingAnimation';

export function ImageDisplay({ imageUrl, isLoading, onRegenerate }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dream-canvas-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

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
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={handleDownload}
            className="bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            title="Download image"
          >
            <Download className="w-5 h-5 text-indigo-600" />
          </button>
          <button
            onClick={onRegenerate}
            className="bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            title="Generate new image"
          >
            <RefreshCw className="w-5 h-5 text-indigo-600" />
          </button>
        </div>
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