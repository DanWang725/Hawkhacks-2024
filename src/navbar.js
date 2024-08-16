import { Avatar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const linkStyle = {
  fontSize: '18px',
  marginLeft: '2rem',
  marginRight: '2rem',
};

const Navbar = () => {
  const clickProfile = () => {
    console.log('clicked profile');
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
          Quiz++
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
        <div className="flex gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Button
              onClick={clickProfile}
              color="tertiary"
              style={{ textTransform: 'none' }}
            >
              <p className=" text-primary text-[18px] pr-2 align-middle">
                User Name
              </p>

              <Avatar>:)</Avatar>
            </Button>
          </div>
        </div>
      </nav>
    </header>
    //   <div className="align-center">
    //     <div className="border-l-2 border-white h-[26px] mt-[12px] absolute"/>
    //   </div>
  );
};

export default Navbar;
