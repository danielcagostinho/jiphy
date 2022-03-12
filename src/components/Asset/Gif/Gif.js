// React Imports
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Component Imports
import Spinner from "../../UI/Spinner/Spinner";

// CSS Imports
import "./Gif.scss";

const Gif = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    setPaused(props.paused);
  }, [props.paused]);

  let videoVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  let { height, width } = props.dimensions;
  let assetStyles =
    props.parent === "thread"
      ? {
          height: height,
          display: loaded && props.isVisible ? "block" : "none",
          width: width,
          maxWidth: width,
          overflow: "hidden",
        }
      : {
          height: height,
          display: loaded && props.isVisible ? "block" : "none",
          width: width,
          maxWidth: width,
          overflow: "hidden",
        };

  let thumbnailDisplay = (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 1 }}
      key={props.src}
      alt="gif"
      src={props.thumbnail}
      style={assetStyles}
    />
  );

  const checkError = (target) => {
    let error = target.naturalHeight === 90 && target.naturalWidth === 120;
    return error;
  };

  let gifDisplay = (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
      variants={videoVariants}
      onLoad={(response) => {
        setError(checkError(response.target));
        // setTimeout(() => {
        // setLoaded(!checkError(response.target));
        // }, 2000);
      }}
      key={props.src}
      alt="gif"
      src={props.src}
      style={assetStyles}
    />
  );

  if (error) {
    props.removeErrorAsset(props.gridIndex);
  }

  return (
    <AnimatePresence>
      <>
        {/* {!loaded ? ( */}
        {/* <AnimatePresence> */}
        {!loaded && (
          <motion.div
            className="GifLoadingBackground"
            style={{ height: height, width: width }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Spinner />
          </motion.div>
          // ) : (
          // <motion.div
          //   className="GifLoadingBackground"
          //   style={{ height: height, width: width, backgroundColor: "blue" }}
          // >
          //   <Spinner />
          // </motion.div>
        )}
        {/* </AnimatePresence> */}
        {paused ? thumbnailDisplay : gifDisplay}
      </>
    </AnimatePresence>
  );
};

export default Gif;
