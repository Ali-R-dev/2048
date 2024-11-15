import React from 'react';
import { useSelector } from 'react-redux';
import { ScoreContainer, ScoreLabel, ScoreValue, ScoreWrapper } from './Score.styles';
import { RootState } from '../../store/store';

export const Score: React.FC = () => {
  const { score, bestScore } = useSelector((state: RootState) => state.game);

  return (
    <ScoreWrapper>
      <ScoreContainer>
        <ScoreLabel>Score</ScoreLabel>
        <ScoreValue>{score}</ScoreValue>
      </ScoreContainer>
      <ScoreContainer>
        <ScoreLabel>Best</ScoreLabel>
        <ScoreValue>{bestScore}</ScoreValue>
      </ScoreContainer>
    </ScoreWrapper>
  );
};
