import CreateTest from './createTest';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TestCard from './card.js';
import { Button, Stack } from '@mui/material';
import { retrieveTests } from '../../Hawkhacks-2024/src/api/tests';

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

      <Button
        variant="contained"
        onClick={() =>
            retrieveTests(1)
        }
      > Testing Button

      </Button>
      
    </>
  );
};

export default App;
