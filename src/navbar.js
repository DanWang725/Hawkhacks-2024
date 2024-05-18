import { Avatar } from '@mui/material';
import Link from '@mui/material/Link';

const linkStyle = {
  fontSize: '18px',
  marginX:'2%',
  display: 'flex',
};

const Navbar = () => {

  const clickProfile = () => {
    console.log('clicked profile');
  }

  return (
    <header className="flex h-14 items-center bg-primary border-b-2 border-secondary px-4 lg:px-6 ">
      <Link href="/" sx={{marginRight:'2%', display: 'flex', fontWeight: 'bold', fontSize: '22px'}} underline='none' color='white'>Study Buddy</Link>

      <Link href="/home" sx={linkStyle} underline='hover' color='white'>Home</Link>
      <Link href="/dashboard" sx={linkStyle} underline='hover' color='white'>Dashboard</Link>
      <Link href="/create" sx={linkStyle} underline='hover' color='white'>Create</Link>

      <nav className="ml-auto flex gap-4 sm:gap-6">
        <div className="ml-auto flex gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-[18px] text-secondary text-white">User Name</span>
            </div>

            <Avatar onClick={clickProfile} sx={{cursor:'pointer'}}>:)</Avatar>
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