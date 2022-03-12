// React Imports
import React from "react";
import { Link } from "react-router-dom";

// CSS Import
import "./NavLink.scss";

const NavLink = ({ route }) => {
  return (
    <div className="NavLinkContainer">
      <Link className="NavLink" to={"/" + route.address}>
        <p>{route.displayName}</p>
      </Link>
    </div>
  );
};

export default NavLink;
