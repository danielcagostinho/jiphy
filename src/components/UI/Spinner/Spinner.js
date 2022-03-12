import React from "react";
import { motion } from "framer-motion";

import logo from "../../../assets/icons/logo.svg";

import './Spinner.scss';

const Spinner = () => {
  const spinnerVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "50%",
    },
  };
  return (
    <div>
      <motion.img
        className="spinner"
        variants={spinnerVariants}
        initial="start"
        animate="end"
        transition={{ duration: 0.6, yoyo: Infinity }}
        src={logo}
        alt="logo"
      />
    </div>
  );
};

export default Spinner;
