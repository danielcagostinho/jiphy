// React Imports
import React, { useState, useEffect, useRef } from "react";

// Component Imports
import Tag from "../../Tag/Tag";
import AssetActionButtons from "../AssetActionButtons/AssetActionButtons";

// CSS Imports
import "./AssetActionSheet.scss";

const AssetActionSheet = ({ asset, onLikeAsset, dimensions }) => {
  const [seeMoreHovered, setSeeMoreHovered] = useState(false);
  const [tagsWrap, setTagsWrap] = useState(false);

  const tagContainerRef = useRef(null);

  let flexWrapStyle = true ? { flexWrap: "wrap" } : { flexWrap: "none" };
  let tagClasses = !seeMoreHovered
    ? "TagContainer hide-extra-content"
    : "TagContainer";

  let tags = asset.tags.substring(1, asset.tags.length - 1).split(",");
  let tagDisplay = tags.map((tag) => {
    return (
      <Tag
        key={tag}
        value={tag}
        variant="AssetActionSheet"
        seeMoreListener={null}
      ></Tag>
    );
  });

  useEffect(() => {
    if (tagContainerRef.current && tagContainerRef.current.scrollHeight > 52) {
      setTagsWrap(true);
    }
  }, []);

  return (
    <div className="AssetActionSheet" style={{ top: dimensions.height - 132 }}>
      <AssetActionButtons asset={asset} onLikeAsset={onLikeAsset} />
      <div className={tagClasses} style={flexWrapStyle} ref={tagContainerRef}>
        <div className="TagWrapContainer">{tagDisplay}</div>
        <div className="show-more-container">
          {!seeMoreHovered && tagsWrap && (
            <span
              className="material-icons"
              onMouseOver={() => setSeeMoreHovered(true)}
            >
              more_vert
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetActionSheet;
