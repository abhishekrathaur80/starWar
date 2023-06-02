import React from "react";
import { Link } from "react-router-dom";
import classes from "./SearchResultPage.module.css";

const SearchResultPage = (props) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Search Results</h1>
      {props.searchResults.length === 0 ? (
        <p>No Result Found</p>
      ) : (
        <ul className={classes.resultList}>
          {props.searchResults.map((result, index) => (
            <li key={index} className={classes.resultItem}>
              {result.name}
              <div>
                <Link to={`/actors/${result.url.split("/")[5]}`}>
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResultPage;
