"use client"; // 👈 important for using useState, useEffect in Next.js App Router

import React, { useEffect, useState } from "react";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=eb2b73cf"; // your API key

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Avengers");

  // function to fetch movies
  const fetchMovies = async (title) => {
    try {
      const res = await fetch(`${API_URL}&s=${title}`);
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]); // no results
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // fetch default movies on first load
  useEffect(() => {
    fetchMovies(searchTerm);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">🎬 Movie Search App</h1>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-l-md text-black w-64"
        />
        <button
          onClick={() => fetchMovies(searchTerm)}
          className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Movies grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
              <p className="text-gray-400">{movie.Year}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-6 text-gray-400">No movies found 😢</p>
      )}
    </div>
  );
}
