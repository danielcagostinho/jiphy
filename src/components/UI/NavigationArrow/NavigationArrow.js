// React Imports
import React from "react";

// CSS Imports
import './NavigationArrow.scss';

// Asset Import
import leftArrow from "../../../assets/icons/arrow-left.png";
import rightArrow from "../../../assets/icons/arrow-right.png";

const NavigationArrow = ({ variant, navigationListener, disabled }) => {

  let arrowImageSource = variant === "left" ? leftArrow : rightArrow;

  return (
    <img
      className="NavigationArrow"
      src={arrowImageSource}
      style={
        disabled ? { filter: "grayscale(100%)" } : {}
      }
      alt={ variant + " arrow"}
      onClick={navigationListener}
    />
  );
};

export default NavigationArrow;
