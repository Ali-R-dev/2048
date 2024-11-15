import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { startGame } from '../../store/gameSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(238, 228, 218, 0.73);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled(motion.div)`
  background: rgba(238, 228, 218, 0.95);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Message = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkText};
  margin: 0 0 1rem 0;
`;

const SubMessage = styled.p`
  color: ${({ theme }) => theme.colors.darkText};
  margin: 0 0 1.5rem 0;
`;

const TryAgainButton = styled.button`
  background: #8f7a66;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.2s;

  &:hover {
    background: #9f8a76;
  }
`;

export const GameStatus = () => {
  const dispatch = useDispatch();
  const { isGameOver, hasWon } = useSelector((state: RootState) => state.game);

  const shouldShow = isGameOver || hasWon;

  return (
    <AnimatePresence>
      {shouldShow && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MessageContainer
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <Message>{hasWon ? 'You Win!' : 'Game Over!'}</Message>
            <SubMessage>
              {hasWon
                ? 'Congratulations! You reached 2048!'
                : 'No more moves available.'}
            </SubMessage>
            <TryAgainButton onClick={() => dispatch(startGame())}>
              Try Again
            </TryAgainButton>
          </MessageContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};
