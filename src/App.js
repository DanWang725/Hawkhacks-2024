import CreateTest from './createTest';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<CreateTest />} />
            <Route path="dashboard" element={<TestCard />} />
            <Route path="create" element={<CreateTest />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
