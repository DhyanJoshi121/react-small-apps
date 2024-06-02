import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";

const Movies = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async (query: string) => {
      try {
        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&client_id=g5s3OOQ6KafzXrNGLdlh9JJFgvzauPe-lmElFUEsED8&per_page=20&page=${page}`
        );
        setData(data.results);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData("japan best view");
  }, [page]);

  const scrollToTop = () => {
    const element = document.getElementById("trending-spot-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    scrollToTop();
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      scrollToTop();
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-5" id="trending-spot-section">
      <div className="text-2xl font-bold text-center ">Trending Spots</div>
      <div className="mt-10 flex flex-row flex-wrap justify-around">
        {data.map((location: unknown) => {
          return <MovieCard url={location?.urls?.raw} />;
        })}
      </div>
      <div className="flex gap-5 bg-slate-400 p-5 justify-center ">
        <button onClick={handlePrevious}>Previous</button>
        <span>{page}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Movies;
