import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import axios, { HttpStatusCode } from "axios";

interface RestaurantData {
  id: number;
  lat: number;
  lon: number;
  tags: {
    amenity: string;
    cuisine: string;
    name: string;
  };
  type: string;
}

export const Map: React.FC = ({ setFavPlaces }) => {
  const [coords, setCoords] = useState({
    _southWest: {
      lat: 48.68767160344967,
      lng: 44.40055795171426,
    },
    _northEast: {
      lat: 48.73320746398345,
      lng: 44.66131158330606,
    },
  });
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [hotels, setHotels] = useState([]);

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ff0000" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`;
  const markerIcon = new L.Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(svgString)}`,
    iconSize: [24, 24],
  });

  const addSearchControl = (map) => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
    });
    map.addControl(searchControl);
  };
  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        console.log("location found:", e.latlng);
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={markerIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  function correctLongitude(bounds) {
    const correctedBounds = { ...bounds };

    while (correctedBounds._northEast.lng > 180) {
      correctedBounds._northEast.lng -= 360;
    }

    while (correctedBounds._northEast.lng < -180) {
      correctedBounds._northEast.lng += 360;
    }

    while (correctedBounds._southWest.lng > 180) {
      correctedBounds._southWest.lng -= 360;
    }

    while (correctedBounds._southWest.lng < -180) {
      correctedBounds._southWest.lng += 360;
    }

    return correctedBounds;
  }

  function makeACall(bounds, zoom, zoomThreshold = 10) {
    console.log(`Current map zoom is ${zoom}`);
    if (zoom > zoomThreshold) {
      const correctedBounds = correctLongitude(bounds);
      setCoords(correctedBounds);
    }
  }

  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => makeACall(map.getBounds(), map.getZoom()),
      zoomend: () => makeACall(map.getBounds(), map.getZoom()),
    });
    return null;
  };

  const getRestaurants = async () => {
    console.log(coords, "asdfs");

    const bbox = `${coords._southWest.lat},${coords._southWest.lng},${coords._northEast.lat},${coords._northEast.lng}`;
    console.log(bbox);
    const query = `
      [out:json];
      (
        node["amenity"="restaurant"](${bbox});
        way["amenity"="restaurant"](${bbox});
        relation["amenity"="restaurant"](${bbox});
      );
      out body;
      >;
      out skel qt;
    `;

    try {
      const res = await axios.get(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          query
        )}`
      );
      if (
        res?.status === HttpStatusCode.Ok &&
        res?.data &&
        res?.data?.elements &&
        res.data.elements.length > 0
      )
        setRestaurants(res.data.elements);
      console.log(res.data.elements);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRestaurants();
    console.log("restaurants", restaurants);
  }, [coords]);

  const addToListButtonHandler = (place) => {
    setFavPlaces((prev) => [...prev, place]);
  };

  return (
    <MapContainer
      center={{ lat: 48.71291, lng: 44.52693 }}
      zoom={13}
      whenCreated={addSearchControl}
    >
      <MapEvents />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=OLwU7ZrpEGgtp9ROWBWj"
      />
      <LocationMarker />
      {restaurants.length > 0 &&
        restaurants.map((restaurant) => {
          const position = { lat: restaurant.lat, lng: restaurant.lon };
          return restaurant.lat && restaurant.lon && restaurant?.tags?.name ? (
            <Marker position={position} icon={markerIcon}>
              <Popup>
                <div>
                  <h2>{restaurant?.tags?.name && restaurant.tags.name}</h2>
                  <button
                    className="p-2 bg-slate-400 rounded-lg "
                    onClick={(e) => addToListButtonHandler(restaurant)}
                  >
                    + Add to list
                  </button>
                </div>
              </Popup>
            </Marker>
          ) : null;
        })}
    </MapContainer>
  );
};
