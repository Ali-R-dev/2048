import React, { useEffect, useState } from 'react';
import { TileContainer } from './Tile.styles';
import { Tile as TileType } from '../../utils/gameLogic';
import { MOVEMENT_SPRING, MERGE_SPRING, NEW_TILE_SPRING } from '../../constants/animation';
import { useTheme } from 'styled-components';

interface TileProps {
  tile: TileType;
}

export const Tile: React.FC<TileProps> = ({ tile }) => {
  const { value, position, mergedFrom } = tile;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const theme = useTheme();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tileSize = isMobile 
    ? parseInt(theme.sizes.mobileTileSize) 
    : parseInt(theme.sizes.tileSize);
  const gap = isMobile 
    ? parseInt(theme.sizes.mobileGap) 
    : parseInt(theme.sizes.gap);

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
        x: MOVEMENT_SPRING,
        y: MOVEMENT_SPRING,
        scale: mergedFrom ? MERGE_SPRING : NEW_TILE_SPRING
      }}
    >
      {value}
    </TileContainer>
  );
};
