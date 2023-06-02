import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./ActorDetailPage.module.css";

const ActorDetailPage = () => {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [starships, setStarship] = useState([]);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${actorId}/`)
      .then((response) => response.json())
      .then((data) => setActor(data))
      .catch((error) => console.log(error));
  }, [actorId]);

  useEffect(() => {
    if (actor) {
      Promise.all(actor.starships.map((starshipUrl) => fetch(starshipUrl)))
        .then((response) => Promise.all(response.map((res) => res.json())))
        .then((data) => setStarship(data))
        .catch((error) => console.log(error));
    }
  }, [actor]);

  if (!actor) {
    return <div>Loading....</div>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{actor.name}</h1>
      <p>Height: {actor.height}</p>
      <p>Mass: {actor.mass}</p>

      <h2>Starships:</h2>
      {starships.map((starship) => (
        <div key={starship.url} className={classes.starship}>
          <Link to={`/starships/${starship.url.split("/")[5]}`}>
            <p className={classes.starshipName}>Name: {starship.name}</p>
          </Link>
          <p className={classes.starshipModel}>Model: {starship.model}</p>
        </div>
      ))}
    </div>
  );
};

export default ActorDetailPage;
