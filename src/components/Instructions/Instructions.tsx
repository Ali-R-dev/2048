import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const InstructionsContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: rgba(238, 228, 218, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: min(400px, 90%);
  height: fit-content;
  max-height: min(90%, 600px);
  padding: min(24px, 5vw);
  overflow-y: auto;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Ensure content is readable on smaller screens */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
    font-size: 0.9rem;
    padding: 20px;
  }
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
  margin: 0 0 20px 0;
  font-size: min(24px, 6vw);
  padding-right: 24px;
`;

const InstructionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  color: #776e65;
  gap: 12px;
`;

const Icon = styled.div`
  font-size: min(24px, 6vw);
  min-width: 40px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: min(20px, 4vw);
  right: min(20px, 4vw);
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #776e65;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const HelpButton = styled.button`
  position: fixed;
  bottom: min(20px, 4vw);
  right: min(20px, 4vw);
  background: #8f7a66;
  border: none;
  border-radius: 50%;
  width: min(48px, 12vw);
  height: min(48px, 12vw);
  color: white;
  font-size: min(24px, 6vw);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background: #9f8a76;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Instructions = () => {
  const [isOpen, setIsOpen] = useState(true);

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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
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
