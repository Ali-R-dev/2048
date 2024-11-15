import styled from 'styled-components';

export const BoardContainer = styled.div`
  background: ${({ theme }) => theme.colors.gameBackground};
  border-radius: 6px;
  position: relative;
  width: min(
    calc(${({ theme }) => theme.sizes.tileSize} * 4 + ${({ theme }) => theme.sizes.gap} * 5),
    calc(100vw - 40px)
  );
  aspect-ratio: 1 / 1;
  padding: ${({ theme }) => theme.sizes.gap};
  touch-action: none;
  user-select: none;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(
      calc(${({ theme }) => theme.sizes.mobileTileSize} * 4 + ${({ theme }) => theme.sizes.mobileGap} * 5),
      calc(100vw - 40px)
    );
    padding: ${({ theme }) => theme.sizes.mobileGap};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${({ theme }) => theme.sizes.gap};
  position: absolute;
  top: ${({ theme }) => theme.sizes.gap};
  left: ${({ theme }) => theme.sizes.gap};
  right: ${({ theme }) => theme.sizes.gap};
  bottom: ${({ theme }) => theme.sizes.gap};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-gap: ${({ theme }) => theme.sizes.mobileGap};
    top: ${({ theme }) => theme.sizes.mobileGap};
    left: ${({ theme }) => theme.sizes.mobileGap};
    right: ${({ theme }) => theme.sizes.mobileGap};
    bottom: ${({ theme }) => theme.sizes.mobileGap};
  }
`;

export const Cell = styled.div`
  background: rgba(238, 228, 218, 0.35);
  border-radius: 3px;
  width: ${({ theme }) => theme.sizes.tileSize};
  height: ${({ theme }) => theme.sizes.tileSize};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: ${({ theme }) => theme.sizes.mobileTileSize};
    height: ${({ theme }) => theme.sizes.mobileTileSize};
    border-radius: 2px;
  }
`;
