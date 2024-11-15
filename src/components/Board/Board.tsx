import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoardContainer, Grid, Cell } from './Board.styles';
import { Tile } from '../Tile/Tile';
import { RootState } from '../../store/store';
import { startGame, moveTiles, processMerges } from '../../store/gameSlice';
import { useSwipe } from '../../hooks/useSwipe';
import { ANIMATION_DURATION } from '../../constants/animation';

export const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { tiles } = useSelector((state: RootState) => state.game);
  
  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    dispatch(moveTiles(direction));
    // Process merges after movement animation completes
    setTimeout(() => {
      dispatch(processMerges());
    }, ANIMATION_DURATION * 1000); // Convert to milliseconds
  };

  const swipeHandlers = useSwipe((direction) => {
    handleMove(direction);
  });

  useEffect(() => {
    dispatch(startGame());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.startsWith('Arrow')) {
        event.preventDefault();
        const direction = event.key.replace('Arrow', '').toLowerCase() as 'up' | 'down' | 'left' | 'right';
        handleMove(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <BoardContainer id="board-container" {...swipeHandlers}>
      <Grid id="grid">
        {Array(16).fill(null).map((_, index) => (
          <Cell key={index} />
        ))}
      </Grid>
      {tiles.map((tile) => (
        <Tile key={tile.id} tile={tile} />
      ))}
    </BoardContainer>
  );
};
