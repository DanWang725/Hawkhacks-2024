import CreateTest from './screens/CreateTestPage.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './screens/DashboardPage.js';
import Navbar from './components/Navbar.js';
import QuizPage from './screens/QuizPage.js';
import { Toaster } from 'react-hot-toast';
import HomePage from './screens/HomePage.js';
import LoginPage from './screens/account/LoginPage.js';
import SignUpPage from './screens/account/SignUpPage.js';
import { UserProvider } from './context/UserContext.js';

const theme = createTheme({
  palette: {
    primary: { main: '#FFAD72' },
    secondary: { main: '#A7BEF2' },
    tertiary: { main: '#1E2A69' },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
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
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
