import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { Footer } from './components/Footer';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    const encodedPrompt = encodeURIComponent(prompt.trim());
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
    
    try {
      const loadImage = (url: string) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = url;
        });
      };

      const finalUrl = `${url}?seed=${Math.random()}`;
      await loadImage(finalUrl);
      setImageUrl(finalUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Image generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateImage();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ImageIcon className="w-8 h-8 text-indigo-600" />
              <h1 className="text-4xl font-bold text-gray-800">Dream Canvas</h1>
            </div>
            <p className="text-gray-600">Transform your imagination into reality with AI-generated artwork</p>
          </div>

          <PromptInput
            prompt={prompt}
            isLoading={isLoading}
            onChange={setPrompt}
            onSubmit={handleSubmit}
          />

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
              {error}
            </div>
          )}

          <div className="relative rounded-lg overflow-hidden bg-white shadow-lg">
            <ImageDisplay
              imageUrl={imageUrl}
              isLoading={isLoading}
              onRegenerate={generateImage}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}