import { useContext, useState } from 'react';
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import { postLogout } from '../api/accounts';

const linkStyle = {
  fontSize: '18px',
  marginLeft: '1.75rem',
  marginRight: '1.75rem',
  fontWeight: 'bold',
};

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    try {
      setUser(null);
      navigate('/');
      postLogout();
    } catch (error) {
      console.error(error);
    } finally {
      toast.success('Logged out.');
    }
  };

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

      <div className="hidden md:block md:mx-auto flex flex-row gap-4">
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

      <div className="block md:hidden mr-auto">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleOpenMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem
            onClick={() => {
              navigate('/');
              handleCloseMenu();
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/dashboard');
              handleCloseMenu();
            }}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/create');
              handleCloseMenu();
            }}
          >
            Create
          </MenuItem>
        </Menu>
      </div>

      <nav className="flex gap-4 sm:gap-6">
        {user ? (
          <div className="flex gap-4">
            <div className="flex items-center">
              <p className="h-min text-right">{user}</p>
            </div>

            <Button
              variant="outlined"
              color="tertiary"
              sx={{ textTransform: 'none' }}
              className="buttonFilled white"
              onClick={() => {
                handleLogout();
              }}
            >
              Log Out
            </Button>
          </div>
        ) : (
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
        )}
      </nav>
    </header>
    //   <div className="align-center">
    //     <div className="border-l-2 border-white h-[26px] mt-[12px] absolute"/>
    //   </div>
  );
};

export default Navbar;
