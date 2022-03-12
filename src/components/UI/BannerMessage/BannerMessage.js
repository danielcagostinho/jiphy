// React Imports
import React from "react";

// Component Imports
import Spinner from "../Spinner/Spinner";

// CSS Imports
import "./BannerMessage.scss";

// JS Imports 
import {getContentWidthPadded} from '../../../utils/DimensionHandler';

const BannerMessage = ({ variant }) => {
  let bannerMessage =
    variant === "loading" ? (
      <>
        <p>Loading Gifs</p> <Spinner />
      </>
    ) : (
      <p>No results found</p>
    );

  return <div className="BannerMessage" style={{width: getContentWidthPadded()}}>{bannerMessage}</div>;
};

export default BannerMessage;
