import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const linkStyle = {
  fontSize: '18px',
  marginLeft: '2rem',
  marginRight: '2rem',
  fontWeight: 'bold',
};

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 flex flex-row h-14 w-full items-center bg-white text-primary border-b-2 px-4 lg:px-6 z-10">
      <div className="hidden md:block">
        <NavLink
          to="/"
          style={() => ({
            marginRight: '2rem',
            display: 'flex',
            fontWeight: 'bold',
            fontSize: '22px',
          })}
        >
          <img
            src="/images/logo-dark-blue.png"
            alt="Quiz++ logo"
            className="h-8 w-auto"
          />
        </NavLink>
      </div>

      <div className="mx-auto flex flex-row">
        <NavLink
          to="/"
          style={({ isActive }) => ({
            borderBottom: isActive ? '1px solid #1E2A69' : 'none',
            ...linkStyle,
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            borderBottom: isActive ? '1px solid #1E2A69' : 'none',
            ...linkStyle,
          })}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/create"
          style={({ isActive }) => ({
            borderBottom: isActive ? '1px solid #1E2A69' : 'none',
            ...linkStyle,
          })}
        >
          Create
        </NavLink>
      </div>

      <nav className="flex gap-4 sm:gap-6">
        <div className="flex gap-2">
          <Button
            variant="outlined"
            color="tertiary"
            sx={{ textTransform: 'none' }}
            className="buttonFilled white"
            onClick={() => {
              navigate('/login');
            }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            color="tertiary"
            sx={{ color: 'white', textTransform: 'none' }}
            className="buttonFilled white"
            onClick={() => {
              navigate('/signup');
            }}
          >
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
    //   <div className="align-center">
    //     <div className="border-l-2 border-white h-[26px] mt-[12px] absolute"/>
    //   </div>
  );
};

export default Navbar;
