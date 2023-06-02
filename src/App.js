import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import HomePage from "./HomePage";
import MovieDetailPage from "./MovieDetailPage";
import ActorDetailPage from "./ActorDetailPage";
import StarShipDetailPage from "./StarShipDetailPage";
import PlanetDetailPage from "./PlanetDetailPage";
import SearchResultPage from "./SearchResultPage";
import classes from "./App.module.css";

const App = () => {
  const history = useHistory();

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    fetch(`https://swapi.dev/api/people/?search=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
        history.push("/search");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Star Wars Movie App</h1>
      <SearchBar onSearch={handleSearch} />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailPage />
        </Route>
        <Route path="/actors/:actorId">
          <ActorDetailPage />
        </Route>
        <Route path="/starships/:starshipId">
          <StarShipDetailPage />
        </Route>
        <Route path="/planets/:planetId">
          <PlanetDetailPage />
        </Route>
        <Route path="/search">
          <SearchResultPage searchResults={searchResults} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
