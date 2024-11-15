import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './store/store';
import { theme } from './styles/theme';
import { Board } from './components/Board/Board';
import { Header } from './components/Header/Header';
import { GameStatus } from './components/GameStatus/GameStatus';
import { Instructions } from './components/Instructions/Instructions';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const GameContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <GameContainer>
            <Header />
            <Board />
            <Instructions />
            <GameStatus />
          </GameContainer>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
