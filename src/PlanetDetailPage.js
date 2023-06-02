import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./PlanetDetailPage.module.css";

const PlanetDetailPage = () => {
  const { planetId } = useParams();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/${planetId}/`)
      .then((response) => response.json())
      .then((data) => setPlanet(data))
      .catch((error) => console.log(error));
  }, [planetId]);

  if (!planet) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{planet.name}</h1>
      <p className={classes.climate}>Climate: {planet.climate}</p>
      <p className={classes.terrain}>Terrain: {planet.terrain}</p>

      <Link
        to={`/movies/${planet.films[0].split("/")[5]}`}
        className={classes["back-link"]}
      >
        Back to Movie Detail Page
      </Link>
    </div>
  );
};

export default PlanetDetailPage;
