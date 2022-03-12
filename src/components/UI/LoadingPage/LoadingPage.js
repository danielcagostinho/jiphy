import React, { useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import Spinner from "../Spinner/Spinner";

import "./LoadingPage.scss";

const LoadingPage = ({ loaded }) => {
  const loaderVariants = {
    hidden: {
      opacity: 1,
      zIndex: 1000
    },

    visible: {
      opacity: 1,
      zIndex: 1000
    },
    exit: {
      opacity: 0,
      zIndex: -1
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },

    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      y: -50,
      opacity: 0,
    },
  };


  const loaderController = useAnimation();

  useEffect(() => {
    if (loaded) {
      loaderController.start("exit");
    } else {
      loaderController.start("visible");
    }
  }, [loaded, loaderController]);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="loading-page"
        initial="hidden"
        animate={loaderController}
        transition={{ duration: 2, delay: 0.5 }}
        variants={loaderVariants}
        exit="exit"
      >
        <motion.h1 variants={textVariants} transition={{ duration: 0.5 }}>
          Welcome to GifSexplorer
        </motion.h1>
        <motion.div variants={textVariants} transition={{ duration: 0.5 }}>
          <Spinner />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingPage;
