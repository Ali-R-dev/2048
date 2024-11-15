import styled from 'styled-components';

export const ScoreWrapper = styled.div`
  display: flex;
  gap: clamp(10px, 3vw, 20px);
  justify-content: center;
  width: 100%;
`;

export const ScoreContainer = styled.div`
  background: ${({ theme }) => theme.colors.gameBackground};
  padding: clamp(10px, 3vw, 15px) clamp(15px, 4vw, 25px);
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.lightText};
  min-width: clamp(80px, 20vw, 100px);
  text-align: center;
`;

export const ScoreLabel = styled.div`
  text-transform: uppercase;
  font-size: clamp(11px, 2.5vw, 13px);
  margin-bottom: clamp(3px, 1vw, 5px);
  font-weight: 500;
`;

export const ScoreValue = styled.div`
  font-size: clamp(20px, 5vw, 25px);
  font-weight: bold;
`;
