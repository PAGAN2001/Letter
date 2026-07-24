import React, { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
  rotation: number;
}

export const HeartBackground: React.FC<{ isCelebration?: boolean }> = ({ isCelebration }) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const heartCount = isCelebration ? 35 : 18;
    const generated: FloatingHeart[] = Array.from({ length: heartCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.random() * 20 + (isCelebration ? 18 : 12),
      duration: Math.random() * 6 + (isCelebration ? 4 : 8),
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: (Math.random() - 0.5) * 45,
    }));
    setHearts(generated);
  }, [isCelebration]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-pink-400/60 drop-shadow-sm select-none transition-all"
          style={{
            left: `${h.left}%`,
            bottom: '-40px',
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `floatUp ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            transform: `rotate(${h.rotation}deg)`,
          }}
        >
          {h.id % 2 === 0 ? '♥' : '💕'}
        </div>
      ))}
    </div>
  );
};
