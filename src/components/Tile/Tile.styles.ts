import styled from 'styled-components';
import { motion } from 'framer-motion';

interface TileProps {
  value: number;
}

export const TileContainer = styled(motion.div)<TileProps>`
  position: absolute;
  top: ${({ theme }) => theme.sizes.gap};
  left: ${({ theme }) => theme.sizes.gap};
  width: ${({ theme }) => theme.sizes.tileSize};
  height: ${({ theme }) => theme.sizes.tileSize};
  background: ${({ theme, value }) => theme.colors.tile[value]?.background || theme.colors.tile['2048'].background};
  color: ${({ theme, value }) => theme.colors.tile[value]?.text || theme.colors.lightText};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: ${({ value }) => {
    if (value <= 64) return '55px';
    if (value <= 512) return '45px';
    return '35px';
  }};
  transform-origin: center;
  will-change: transform;
  z-index: 1;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: ${({ theme }) => theme.sizes.mobileGap};
    left: ${({ theme }) => theme.sizes.mobileGap};
    width: ${({ theme }) => theme.sizes.mobileTileSize};
    height: ${({ theme }) => theme.sizes.mobileTileSize};
    font-size: ${({ value }) => {
      if (value <= 64) return '30px';
      if (value <= 512) return '25px';
      return '20px';
    }};
  }
`;
