import styled from 'styled-components';

export const ScoreWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ScoreContainer = styled.div`
  background: ${({ theme }) => theme.colors.gameBackground};
  padding: 15px 25px;
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.lightText};
  min-width: 100px;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 10px 15px;
    min-width: 80px;
  }
`;

export const ScoreLabel = styled.div`
  text-transform: uppercase;
  font-size: 13px;
  margin-bottom: 5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 11px;
  }
`;

export const ScoreValue = styled.div`
  font-size: 25px;
  font-weight: bold;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 20px;
  }
`;
