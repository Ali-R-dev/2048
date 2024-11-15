import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../../store/gameSlice';
import { RootState } from '../../store/store';

const HeaderContainer = styled.header`
  width: 100%;
  margin-bottom: 2rem;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 4.5rem;
  font-weight: bold;
  margin: 0;
  line-height: 1;
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-end;
`;

const ScoreSection = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const ScoreBox = styled.div`
  background: ${({ theme }) => theme.colors.darkText};
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  min-width: 90px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ScoreLabel = styled.div`
  color: #eee4da;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const ScoreValue = styled.div`
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 0.1rem;
`;

const NewGameButton = styled.button`
  background: #8f7a66;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;

  &:hover {
    background: #9f8a76;
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const Header = () => {
  const dispatch = useDispatch();
  const { score, bestScore } = useSelector((state: RootState) => state.game);

  return (
    <HeaderContainer>
      <TopSection>
        <TitleSection>
          <Title>2048</Title>
          <Subtitle>Join the numbers to get to 2048!</Subtitle>
        </TitleSection>
        <Controls>
          <ScoreSection>
            <ScoreBox>
              <ScoreLabel>Score</ScoreLabel>
              <ScoreValue>{score}</ScoreValue>
            </ScoreBox>
            <ScoreBox>
              <ScoreLabel>Best</ScoreLabel>
              <ScoreValue>{bestScore}</ScoreValue>
            </ScoreBox>
          </ScoreSection>
          <NewGameButton onClick={() => dispatch(startGame())}>
            New Game
          </NewGameButton>
        </Controls>
      </TopSection>
    </HeaderContainer>
  );
};
