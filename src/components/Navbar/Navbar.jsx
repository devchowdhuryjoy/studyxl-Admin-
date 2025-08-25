import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="flex justify-between items-center bg-white shadow px-4 py-3">
        <h1 className="text-lg font-semibold">Study-XL</h1>
        <div className="flex items-center gap-4">
          <span>Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>
    </>
  );
};

export default Navbar;



