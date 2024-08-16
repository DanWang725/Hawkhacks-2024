const CardRow = ({ children }) => {
  return (
    <div className="h-[218px] w-full flex relative">
      <div className="w-full flex flex-row gap-4 py-6 overflow-x-scroll overflow-y-hidden">
        {children}
      </div>
      {/* This is a really scuffed way of doing the fade effect, you are welcome to try something better :) */}
      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-[96%] from-[rgba(0,0,0,0)] to-white pointer-events-none"></div>
    </div>
  );
};

export default CardRow;
