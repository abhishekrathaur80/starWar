import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Star War Movies</h1>
      {movies.map((movie) => (
        <div key={movie.episode_id}>
          <Link to={`/movies/${movie.episode_id}`}>
            <h2>{movie.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
