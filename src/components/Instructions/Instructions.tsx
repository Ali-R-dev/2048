import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const InstructionsContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(238, 228, 218, 0.95);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  width: 400px;
  z-index: 1000;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Title = styled.h2`
  color: #776e65;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const InstructionItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  color: #776e65;
  gap: 1rem;
`;

const Icon = styled.div`
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #776e65;
  
  &:hover {
    color: #000;
  }
`;

const HelpButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: #8f7a66;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #9f8a76;
  }
`;

export const Instructions = () => {
  const [isOpen, setIsOpen] = useState(true); // Show on first load

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <InstructionsContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
              <Title>How to Play 2048</Title>
              
              <InstructionItem>
                <Icon>⌨️</Icon>
                <div>Use arrow keys to move tiles</div>
              </InstructionItem>
              
              <InstructionItem>
                <Icon>👆</Icon>
                <div>Swipe to move tiles on mobile devices</div>
              </InstructionItem>
              
              <InstructionItem>
                <Icon>🔄</Icon>
                <div>Merge tiles with the same number</div>
              </InstructionItem>
              
              <InstructionItem>
                <Icon>🎯</Icon>
                <div>Reach 2048 to win!</div>
              </InstructionItem>
              
              <InstructionItem>
                <Icon>💡</Icon>
                <div>Plan your moves to achieve higher scores</div>
              </InstructionItem>
            </InstructionsContainer>
          </>
        )}
      </AnimatePresence>
      
      {!isOpen && (
        <HelpButton 
          onClick={() => setIsOpen(true)}
          aria-label="Show instructions"
        >
          ?
        </HelpButton>
      )}
    </>
  );
};
