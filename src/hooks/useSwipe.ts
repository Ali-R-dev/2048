import { useState, useEffect } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

export const useSwipe = (onSwipe: (direction: Direction) => void) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: React.TouchEvent['touches']) => {
      const touch = e[0];
      setTouchStart({
        x: touch.clientX,
        y: touch.clientY,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e: React.TouchEvent['changedTouches']) => {
      if (!touchStart) return;

      const touch = e[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      const minSwipeDistance = 30;

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

    const board = document.getElementById('board-container');
    if (!board) return;

    board.addEventListener('touchstart', (e) => handleTouchStart(e.touches));
    board.addEventListener('touchmove', handleTouchMove, { passive: false });
    board.addEventListener('touchend', (e) => handleTouchEnd(e.changedTouches));

    return () => {
      board.removeEventListener('touchstart', (e) => handleTouchStart(e.touches));
      board.removeEventListener('touchmove', handleTouchMove);
      board.removeEventListener('touchend', (e) => handleTouchEnd(e.changedTouches));
    };
  }, [onSwipe, touchStart]);

  return {};
};
