import React from "react";
import { motion } from "framer-motion";

import logo from "../../../assets/icons/logo.svg";

import './Spinner.scss';

const Spinner = () => {

  return (
    <div>
      <motion.span
        className="spinner material-icons"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 0.7, repeatDelay: 0.2 }}
        alt="logo"
      >
        restart_alt
      </motion.span>
    </div>
  );
};

export default Spinner;
