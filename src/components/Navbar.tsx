import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex gap-5 px-10 py-2 items-center ">
      <NavLink to={"/"}>
        <h1 className="text-2xl">LOGO</h1>
      </NavLink>
      <div className="flex gap-3 text-xl text-blue-500 font-bold">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/watchList"}>WatchList</NavLink>
        <NavLink to={"/about"}>About</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
