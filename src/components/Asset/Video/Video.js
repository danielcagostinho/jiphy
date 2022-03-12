import React, { useState, useRef, useEffect } from "react";


import Spinner from "../../UI/Spinner/Spinner";

const Video = (props) => {
  const [loaded, setLoaded] = useState(false);

  const videoRef = useRef(null);

  let { height, width } = props.dimensions;

  let assetStyles =
    props.parent === "thread"
      ? {
          height: height,
          display: loaded && props.isVisible ? "block" : "none",
          width: width,
        }
      : {
          height: height,
          display: loaded && props.isVisible ? "block" : "none",
          width: width,
        };

  let videoVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  useEffect(() => {
    if (videoRef.current){
      // console.log("[Video.js] inside useeffect")
      if (props.paused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [props.paused])

  return (
    <>
      {!loaded && (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </div>
      )}
      <video
        variants={videoVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 2 }}
        autoPlay={true}
        repeat
        preload="auto"
        controls={props.parent === "thread"}
        muted={props.muted}
        style={assetStyles}
        key={props.src}
        // onLoadedMetadata={(response) => {
        //   setLoaded(true);
        // }}
        ref={videoRef}
      >
        <source src={props.src} type={`video/${props.contentType}`} />
      </video>
    </>
  );
};

export default Video;
