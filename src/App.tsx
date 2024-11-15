
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './store/store';
import { theme } from './styles/theme';
import { Board } from './components/Board/Board';
import { Score } from './components/Score/Score';
import { GlobalStyle } from './styles/GlobalStyle';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 80px;
  margin: 0 0 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 40px;
    margin: 0 0 15px;
  }
`;

const Instructions = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.darkText};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
    margin-top: 15px;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <Title>2048</Title>
          <Score />
          <Board />
          <Instructions>
            Use arrow keys or swipe to move tiles. Combine matching numbers to score points!
          </Instructions>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
