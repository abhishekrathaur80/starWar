import React, { useState } from "react";
import classes from "./SearchBar.module.css";
const SearchBar = (props) => {
  const [query, setQuery] = useState("");

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    props.onSearch(query);
  };
  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        value={query}
        type="text"
        onChange={handleQuery}
        placeholder="Search ..."
      />
      <button className={classes.button} onClick={handleSearch}>
        {" "}
        Search
      </button>
    </div>
  );
};

export default SearchBar;
