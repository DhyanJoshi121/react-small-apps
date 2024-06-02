import React from "react";

interface prop {
  url: string;
}

const MovieCard = ({ url }: prop) => {
  return (
    <div className="h-[40vh] w-30 hover:scale-105 mt-5">
      <img src={url} alt="banner" className=" h-full object-cover" />
    </div>
  );
};

export default MovieCard;
