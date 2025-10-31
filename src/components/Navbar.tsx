"use client";


const Navbar = () => {
  return (
    <nav className="z-50 fixed top-0 h-14 left-0 w-screen bg-white shadow-sm flex justify-center  ">

      <div className="w-2xl  md:w-3xl lg:w-5xl h-full flex justify-between items-center mx-5 sm:mx-10 md:mx-auto">
        <img src="/HDlogo 1.png" alt="Logo" className="w-15 h-10" />
        <div className="flex items-center gap-2 w-auto">
          <input
            type="text"
            placeholder="Search experiences"
            className=" border border-gray-300 rounded-md px-3 sm:pl-3 sm:pr-25 py-2 text-sm  focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-4 py-2 rounded-md text-sm transition">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
