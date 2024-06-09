import React, { useEffect, useState } from "react";
import { Map } from "../components/Map";
import axios from "axios";
import { ArrowDownZA, ArrowUpAZ, X } from "lucide-react";

const WatchListScreen = () => {
  const [favPlaces, setFavPlaces] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  const sortedPlaces = [...favPlaces].sort((a, b) => {
    if (a.tags.name < b.tags.name) {
      return sortAscending ? -1 : 1;
    }
    if (a.tags.name > b.tags.name) {
      return sortAscending ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <div className="w-[90vw] m-auto">
        <h1 className=" font-bold text-2xl">Favorite Places</h1>
        <div className="border p-2 rounded-lg">
          <p className="flex gap-2">
            Name{" "}
            <button onClick={() => setSortAscending(!sortAscending)}>
              {sortAscending ? <ArrowUpAZ /> : <ArrowDownZA />}
            </button>
          </p>
          <div className="flex flex-col mt-3 border-t pt-2 ">
            {sortedPlaces.map((place, i) => (
              <div className="flex justify-between hover:bg-slate-400/50 ">
                <p>{place.tags.name}</p>
                <div>
                  <button
                    onClick={() =>
                      setFavPlaces((prev) =>
                        prev.filter((_, index) => i !== index)
                      )
                    }
                  >
                    <X className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <Map setFavPlaces={setFavPlaces} />
        </div>
      </div>
    </div>
  );
};

export default WatchListScreen;
