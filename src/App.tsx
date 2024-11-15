import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './store/store';
import { theme } from './styles/theme';
import { Board } from './components/Board/Board';
import { Score } from './components/Score/Score';
import { Instructions } from './components/Instructions/Instructions';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';

const Container = styled.div`
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

const Header = styled.header`
  width: 100%;
  margin-bottom: 2rem;
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <GameContainer>
            <Header>
              <Score />
            </Header>
            <Board />
            <Instructions />
          </GameContainer>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
