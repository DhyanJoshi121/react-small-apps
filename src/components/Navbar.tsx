import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex gap-2 px-10 py-2 items-center ">
      <NavLink to={"/"}>
        <h1 className="text-xl sm:text-2xl">LOGO</h1>
      </NavLink>
      <div className="flex gap-1 sm:gap-3 text-lg sm:text-xl text-blue-500 font-semibold  sm:font-bold">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/watchList"}>WatchList</NavLink>
        <NavLink to={"/planner"}>Planner</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
