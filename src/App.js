import CreateTest from './createTest';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestCard from './card.js';
import { Button, Stack } from '@mui/material';
import { retrieveTests } from '../../Hawkhacks-2024/src/api/tests';
import DashboardPage from './DashboardPage.js';
import Navbar from './navbar.js';
import QuizPage from './screens/QuizPage.js';
import { Toaster } from 'react-hot-toast';
import HomePage from './screens/HomePage.js';

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
        <Toaster position="bottom-center" reverseOrder />
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="create" element={<CreateTest />} />
            <Route path="test/:id" element={<QuizPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
