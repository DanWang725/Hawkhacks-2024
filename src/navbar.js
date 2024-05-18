import { Avatar } from "@mui/material";
import Link from "@mui/material/Link";


function Navbar() {
  return (
    <div className="w-100 h-[50px] bg-primary table table-fixed">
      <div className="w-[15%] table-cell align-middle"> 
        <h1 className="text-white font-bold text-2xl  pl-4">Study Buddy</h1>
      </div>

      <div className="border-l-2"/>
      <div className="table-cell w-[85%] align-middle text-right">
        <Link className="ml-auto mr-4">Home</Link>
        <Link>Dashboard</Link>
        <Link className="">Create</Link>
        <Avatar className="mr-10">H</Avatar>
      </div>
    </div>
  );
}


export default Navbar;