import { Avatar } from '@mui/material';
import Link from '@mui/material/Link';


const linkStyle = {
  fontSize: '18px',
};


const Navbar = () => {
  return (
    <div className="w-100 h-[50px] bg-primary table table-fixed text-white">
      <div className="w-[200px] table-cell align-middle"> 
        <h1 className="font-bold text-2xl pl-4">Study Buddy</h1>
      </div>
      
      <div className="w-[5%] table-cell align-center"> 
        <div className="border-l-2 border-white h-[30px] mt-[10px] absolute"/>
      </div>

      <div className="table-cell w-[80%] align-middle text-right">
        <Link 
          href="/home"
          sx={{marginX:'2%', ...linkStyle}}
          underline='hover'
          color='inherit'
        >
          Home
        </Link>
        <Link 
          href="/dashboard"
          sx={{marginX:'2%', ...linkStyle}}
          underline='hover'
          color='inherit'
        >
          Dashboard
        </Link>
        <Link 
          href="/create" 
          sx={{marginLeft:'2%', marginRight:'4%', ...linkStyle}}
          underline='hover'
          color='inherit'
        >
          Create
        </Link>
      </div>

      <div className="table-cell w-[5%] align-middle">
        <Avatar className="mx-auto">Jo</Avatar>
      </div>
    </div>
  );
};


export default Navbar;