import React, { useEffect, useState, useCallback } from 'react';

const funFacts = [
  "Did you know? The first digital image was created in 1957!",
  "The human brain processes images 60,000 times faster than text.",
  "The first AI-generated art piece sold at Christie's for $432,500.",
  "Over 3.2 billion images are shared online every day.",
  "The term 'pixel' was first published in 1965.",
  "AI can now generate images in less than a second.",
  "The first computer mouse was made of wood!",
  "Digital art became mainstream in the 1990s.",
  "More images are taken every 2 minutes than in the entire 1800s.",
  "The first computer animation was created in 1961."
];

export function LoadingAnimation() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    setFactIndex(Math.floor(Math.random() * funFacts.length));
  }, []);

  const getRandomSpeed = useCallback(() => {
    const baseSpeed = 2.0;
    const variation = Math.random() * 0.5 - 0.25;
    return baseSpeed + variation;
  }, []);

  useEffect(() => {
    let animationFrameId;
    let lastTimestamp;
    let currentSpeed = getRandomSpeed();
    
    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      
      setProgress(prevProgress => {
        if (prevProgress < 30 && phase === 0) {
          currentSpeed = getRandomSpeed() * 1.5;
          setPhase(1);
        } else if (prevProgress >= 30 && prevProgress < 60 && phase === 1) {
          currentSpeed = getRandomSpeed() * 1.2;
          setPhase(2);
        } else if (prevProgress >= 60 && prevProgress < 85 && phase === 2) {
          currentSpeed = getRandomSpeed() * 1.0;
          setPhase(3);
        }

        const increment = (currentSpeed * deltaTime) / 8;
        const newProgress = Math.min(prevProgress + increment * 0.15, 95);
        
        return newProgress;
      });

      lastTimestamp = timestamp;
      
      if (progress < 95) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [getRandomSpeed, phase, progress]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md px-4">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-8 border-indigo-200 rounded-full"></div>
        <div className="absolute inset-0 border-8 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        <p className="text-indigo-600 font-medium">Creating your masterpiece</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
          <div 
            className="bg-indigo-600 h-2.5 transition-all duration-150 ease-out"
            style={{ 
              width: `${progress}%`,
              transition: 'width 0.15s ease-out'
            }}
          ></div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-2 max-w-xs">
          <p className="animate-pulse">{funFacts[factIndex]}</p>
        </div>
        <div className="flex gap-1 mt-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}