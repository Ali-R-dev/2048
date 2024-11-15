import { useState, TouchEvent, useEffect } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

export const useSwipe = (onSwipe: (direction: Direction) => void) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchStart({
        x: touch.clientX,
        y: touch.clientY,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      const minSwipeDistance = 50;

      if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
        return;
      }

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        onSwipe(deltaX > 0 ? 'right' : 'left');
      } else {
        onSwipe(deltaY > 0 ? 'down' : 'up');
      }

      setTouchStart(null);
    };

    const grid = document.getElementById('grid');
    if (!grid) return;

    grid.addEventListener('touchstart', handleTouchStart);
    grid.addEventListener('touchmove', handleTouchMove, { passive: false });
    grid.addEventListener('touchend', handleTouchEnd);

    return () => {
      grid.removeEventListener('touchstart', handleTouchStart);
      grid.removeEventListener('touchmove', handleTouchMove);
      grid.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipe, touchStart]);

  return {};
};
