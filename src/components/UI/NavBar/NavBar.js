// React Imports
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { IsMobile } from '../../../hooks/useWindowSize';

// Component Imports
import SearchBar from "../SearchBar/SearchBar";
import NavLink from "./NavLink/NavLink";
import NavDropdown from "./NavDropdown/NavDropdown";
import Filter from "../../Filter/Filter";


// CSS Imports
import "./NavBar.scss";

// JS Imports
import { scrollToTop } from "../../../utils/utils";
import * as actions from "../../../store/actions/actions";

// Asset Imports
import logo from "../../../assets/icons/logo.svg";
import dice from "../../../assets/icons/dice.png";
import WithLink from "../../../HOC/WithLink";

const NavBar = ({ routes }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logoVariants = {
    start: {
      y: "0%",
    },
    hover: {
      y: ["0%", "10%", "0%"],
      transition: { duration: 0.6, yoyo: Infinity },
    },
  };


  let navBrand;
  if (location.pathname === "/") {
    navBrand = (
      <div className="NavBrand">
        <div className="NavBrandContent" onClick={scrollToTop}>
          <div className="NavBrandLogo">
            <motion.img
              src={logo}
              alt="Website Logo"
              initial={logoVariants.start}
              variants={logoVariants}
              className="NavBrandLogoImg"
            />
          </div>
          <div className="NavBrandText">{!IsMobile() && <p>Jiphy</p>}</div>
        </div>
      </div>
    )
  } else {
    navBrand = (
      <div className="NavBrand">
        <WithLink destination={"/"} className="NavBrandLink">
          <div className="NavBrandContent">
            <div className="NavBrandLogo">
              <motion.img
                src={logo}
                alt="Website Logo"
                initial={logoVariants.start}
                variants={logoVariants}
                className="NavBrandLogoImg"
              />
            </div>
            <div className="NavBrandText">{!IsMobile() && <p>Jiphy</p>}</div>
          </div>
        </WithLink>
      </div>
    );
  }

  const shuffleButton =
    location.pathname === "/" ? (
      <motion.img
        src={dice}
        alt="shuffle"
        className="Dice"
        onClick={() => {
          dispatch(actions.clearQueue());
          dispatch(actions.fetchNewAssets());
          dispatch(actions.clearTags());
        }}
        whileTap={{ rotate: 360 }}
      />
    ) : (
      <Link to="/">
        <img src={dice} alt="shuffle" className="Dice" />
      </Link>
    );

  let routeLinks = routes
    .filter((route) => "/" + route.address !== location.pathname)
    .map((route) => {
      return <NavLink route={route} key={route.address} />;
    });

  return (
    <div className="NavBar">
      <div className="NavContent">
        {navBrand}
        <div className="Center">
          {shuffleButton}
          <SearchBar />
          <NavDropdown role="filter" icon="tune">
            <Filter />
          </NavDropdown>
        </div>
        <div className="Right">
          <NavDropdown role="nav" icon="dehaze">
            {routeLinks}
          </NavDropdown>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
