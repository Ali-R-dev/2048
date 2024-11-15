import { useState, useEffect } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

export const useSwipe = (onSwipe: (direction: Direction) => void) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Don't handle touch if it's on a button or interactive element
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'button') {
        return;
      }
      
      const touch = e.touches[0];
      if (touch) {
        setTouchStart({
          x: touch.clientX,
          y: touch.clientY,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Only prevent default if we're handling the touch
      if (touchStart) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return;

      const touch = e.changedTouches[0];
      if (!touch) return;

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

    // Attach to document body instead of board
    document.body.addEventListener('touchstart', handleTouchStart);
    document.body.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.body.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.body.removeEventListener('touchstart', handleTouchStart);
      document.body.removeEventListener('touchmove', handleTouchMove);
      document.body.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipe, touchStart]);

  return {};
};
