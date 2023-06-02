import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./MovieDetailPage.module.css";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/${movieId}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.log(error));
  }, [movieId]);

  useEffect(() => {
    if (movie) {
      Promise.all(movie.characters.map((characterUrl) => fetch(characterUrl)))
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((data) => setActors(data))
        .catch((error) => console.log(error));
    }
  }, [movie]);

  useEffect(() => {
    if (movie) {
      Promise.all(movie.planets.map((planetUrl) => fetch(planetUrl)))
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((data) => setPlanets(data))
        .catch((error) => console.log(error));
    }
  }, [movie]);

  if (!movie) {
    return <div> Loading....</div>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}> {movie.title}</h1>
      <p>Director: {movie.director}</p>
      <p>Release Date: {movie.release_date}</p>

      <h2>Actors/Characters:</h2>
      {actors.map((actor) => (
        <div key={actor.url} className={classes.actor}>
          <Link
            to={`/actors/${actor.url.split("/")[5]}`}
            className={classes.actorLink}
          >
            <p>Name: {actor.name}</p>
          </Link>
          <p>Height: {actor.height} </p>
        </div>
      ))}
      <h2>Planets:</h2>
      {planets.map((planet) => (
        <div key={planet.url} className={classes.planet}>
          <Link
            to={`/planets/${planet.url.split("/")[5]}`}
            className={classes.planetLink}
          >
            <p>Name: {planet.name}</p>{" "}
          </Link>
          <p>Climate: {planet.climate} </p>
        </div>
      ))}
    </div>
  );
};

export default MovieDetailPage;
