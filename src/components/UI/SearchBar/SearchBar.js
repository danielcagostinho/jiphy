import React, { useState } from "react";
import { connect } from "react-redux";

// CSS Imports
import "./SearchBar.scss";

// Redux Action Imports
import * as actionCreators from "../../../store/actions/actions";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchListOpen, setSearchListOpen] = useState(false);
  const [searchButtonHovered, setSearchButtonHovered] = useState(false);

  let searchBarStyles = { borderRadius: "12px" };
  let searchButtonStyles =
    searchTerm !== ""
      ? searchButtonHovered
        ? { cursor: "pointer", backgroundColor: "#222121" }
        : { cursor: "default", backgroundColor: "inherit" }
      : { cursor: "not-allowed" };

  // if (searchListOpen) {
  //   searchBarStyles = {
  //     borderRadius: "12px 12px 0 0",
  //   };
  // }

  const submitSearch = (e) => {
    if (searchTerm !== "") {
      e.preventDefault();
      // setSearchListOpen(false);
      props.onAddToTagFilterArray(searchTerm, props.tagFilterArray);
      setSearchTerm("");
    }
  };

  // const searchList = dropdownResults
  //   .filter((result) => {
  //     return result.substring(0, searchTerm.length) === searchTerm;
  //   })
  //   .slice(0, 10)
  //   .map((result, idx) => {
  //     return (
  //       <SearchListItem
  //         name={result}
  //         id={idx}
  //         setSearchTerm={setSearchTerm}
  //         submitSearch={submitSearch}
  //       />
  //     );
  //   });

  // useEffect(() => {
  //   if (searchTerm.length > 0) {
  //     setSearchListOpen(true);
  //   } else {
  //     setSearchListOpen(false);
  //   }
  // }, [searchTerm]);

  return (
    <div className="search-container">
      <form
        className="search-bar"
        onSubmit={submitSearch}
        style={searchBarStyles}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div
          className="search-button"
          onClick={submitSearch}
          style={searchButtonStyles}
          onMouseEnter={() => setSearchButtonHovered(true)}
          onMouseLeave={() => setSearchButtonHovered(false)}
        >
          <span className="material-icons">search</span>
        </div>
      </form>
      {/* {searchListOpen && <div className="search-list">{searchList}</div>} */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tagFilterArray: state.tagFilterArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToTagFilterArray: (tag, tagFilterArray) =>
      dispatch(actionCreators.addToTagFilterArray(tag, tagFilterArray)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
