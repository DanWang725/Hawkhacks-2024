import CreateTest from './createTest';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#FFAD72' },
    secondary: { main: '#72C4FF' },
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CreateTest />
      </ThemeProvider>
    </>
  );
};

export default App;
