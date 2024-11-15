import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './store/store';
import { theme } from './styles/theme';
import { Board } from './components/Board/Board';
import { Score } from './components/Score/Score';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 20px;
  box-sizing: border-box;
`;

const GameContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: clamp(40px, 10vw, 80px);
  margin: 0;
  text-align: center;
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppWrapper>
          <GameContainer>
            <Title>2048</Title>
            <Score />
            <Board />
          </GameContainer>
        </AppWrapper>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
