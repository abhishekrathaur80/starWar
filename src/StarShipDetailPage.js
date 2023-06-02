import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./StarShipDetailPage.module.css";
const StarShipDetailPage = () => {
  const { starshipId } = useParams();
  const [startship, setStarship] = useState(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/${starshipId}/`)
      .then((response) => response.json())
      .then((data) => setStarship(data))
      .catch((error) => console.log(error));
  }, [starshipId]);

  if (!startship) {
    return <div>Loading....</div>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{startship.name}</h1>
      <p className={classes.modal}>Model: {startship.model}</p>
      <p className={classes.manufacturer}>
        Manufacturer: {startship.manufacturer}
      </p>
      <Link
        classNam={classes["back-link"]}
        to={`/movies/${startship.films[0].split("/")[5]}`}
      >
        Back to Movie Detail Page
      </Link>
    </div>
  );
};

export default StarShipDetailPage;
