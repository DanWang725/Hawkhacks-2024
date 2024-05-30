import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';

const linkStyle = {
  color: 'white',
  fontSize: '18px',
  marginLeft: '2rem',
  marginRight: '2rem',
};

const Navbar = () => {
  const clickProfile = () => {
    console.log('clicked profile');
  };

  return (
    <header className="fixed top-0 flex flex-row h-14 w-full items-center bg-primary px-4 lg:px-6 z-10">
      <NavLink
        to="/"
        style={() => ({
          marginRight: '2rem',
          display: 'flex',
          fontWeight: 'bold',
          fontSize: '22px',
          color: 'white',
        })}
      >
        Study Buddy
      </NavLink>

      <div className="mx-auto flex flex-row">
        <NavLink
          to="/"
          style={({ isActive }) => ({
            // textDecorationLine: isActive ? 'underline' : 'none',
            borderBottom: isActive ? '1px solid white' : 'none',
            ...linkStyle,
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            // textDecorationLine: isActive ? 'underline' : 'none',
            borderBottom: isActive ? '1px solid white' : 'none',
            ...linkStyle,
          })}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/create"
          style={({ isActive }) => ({
            // textDecorationLine: isActive ? 'underline' : 'none',
            borderBottom: isActive ? '1px solid white' : 'none',
            ...linkStyle,
          })}
        >
          Create
        </NavLink>
      </div>

      <nav className="flex gap-4 sm:gap-6">
        <div className="flex gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-end">
              <span className="text-[18px] text-secondary text-white">
                User Name
              </span>
            </div>

            <Avatar onClick={clickProfile} sx={{ cursor: 'pointer' }}>
              :)
            </Avatar>
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
