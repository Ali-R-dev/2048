import React, { useEffect, useState } from 'react';
import { TileContainer } from './Tile.styles';
import { Tile as TileType } from '../../utils/gameLogic';

interface TileProps {
  tile: TileType;
}

export const Tile: React.FC<TileProps> = ({ tile }) => {
  const { value, position, mergedFrom } = tile;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tileSize = isMobile ? 60 : 106.25;
  const gap = isMobile ? 10 : 15;

  // Calculate position relative to the grid
  const x = position.col * (tileSize + gap);
  const y = position.row * (tileSize + gap);

  return (
    <TileContainer
      value={value}
      initial={mergedFrom ? { scale: 1.2, x, y } : { scale: 0, x, y }}
      animate={{
        x,
        y,
        scale: 1
      }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 300, damping: 30 },
        scale: mergedFrom 
          ? { type: "spring", stiffness: 200, damping: 20 }
          : { type: "spring", stiffness: 500, damping: 30 }
      }}
    >
      {value}
    </TileContainer>
  );
};
