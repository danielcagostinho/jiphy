import React from "react";

import "./SearchListItem.scss";

const SearchListItem = ({ name, id, submitSearch }) => {
  return (
    <div
      className="search-list-item"
      key={id}
      onClick={() => {
        submitSearch(name);
      }}
    >
      {name}
    </div>
  );
};

export default SearchListItem;
