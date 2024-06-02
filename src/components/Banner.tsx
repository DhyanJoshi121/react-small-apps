import React from "react";
import banner from "../assets/banner.jpg";

const Banner = () => {
  return (
    <div className="h-[50vh]">
      <img src={banner} alt="banner" className="w-full h-full object-cover" />
    </div>
  );
};

export default Banner;
