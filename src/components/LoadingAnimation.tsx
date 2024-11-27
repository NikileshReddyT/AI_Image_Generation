import React, { useEffect, useState, useCallback } from 'react';

export function LoadingAnimation() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const getRandomSpeed = useCallback(() => {
    // Increased base speed with random variation
    const baseSpeed = 2.0; // Increased from 0.5
    const variation = Math.random() * 0.5 - 0.25; // Increased variation
    return baseSpeed + variation;
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number;
    let currentSpeed = getRandomSpeed();
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      
      setProgress(prevProgress => {
        // Faster progress through phases
        if (prevProgress < 30 && phase === 0) {
          currentSpeed = getRandomSpeed() * 1.5; // Even faster initial phase
          setPhase(1);
        } else if (prevProgress >= 30 && prevProgress < 60 && phase === 1) {
          currentSpeed = getRandomSpeed() * 1.2; // Faster middle phase
          setPhase(2);
        } else if (prevProgress >= 60 && prevProgress < 85 && phase === 2) {
          currentSpeed = getRandomSpeed() * 1.0; // Maintained speed near end
          setPhase(3);
        }

        // Increased increment for faster progress
        const increment = (currentSpeed * deltaTime) / 8; // Doubled speed from previous 16
        const newProgress = Math.min(prevProgress + increment * 0.15, 95); // Increased multiplier
        
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
              transition: 'width 0.15s ease-out' // Faster transition
            }}
          ></div>
        </div>
        <div className="flex gap-1">
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