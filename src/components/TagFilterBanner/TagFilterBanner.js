import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/actions";

import Tag from "../Tag/Tag";

import "./TagFilterBanner.scss";

const TagFilterBanner = ({
  tagFilterArray,
  onRemoveTag,
  updateHeight,
  onClearTags,
}) => {
  const [seeMoreHovered, setSeeMoreHovered] = useState(true);
  const [tagsWrap, setTagsWrap] = useState(false);

  const tagFilterBannerRef = useRef(null);
  const tagContainerRef = useRef(null);

  const uniqueTags = [...new Set(tagFilterArray.map((tag) => tag.toLowerCase()))];
  const sortedTagFilterArray = [...uniqueTags];
  sortedTagFilterArray.sort();
  let tags = sortedTagFilterArray.map((tag, tagIdx) => {
    return (
      <Tag
        value={tag}
        variant="TagFilterBanner"
        clickHandler={() => onRemoveTag(tagIdx, sortedTagFilterArray)}
        seeMoreListener={null}
      ></Tag>
    );
  });

  let flexWrapStyle = true ? { flexWrap: "wrap" } : { flexWrap: "none" };
  let tagClasses = !seeMoreHovered
    ? "TagFilterContainer hide-extra-content"
    : "TagFilterContainer";

  useEffect(() => {
    if (tagFilterBannerRef.current) {
      updateHeight(84 + tagFilterBannerRef.current.clientHeight);
    }
    if (tagContainerRef.current && tagContainerRef.current.scrollHeight > 20) {
      setTagsWrap(true);
    }
    return () => {
      updateHeight(84);
    };
  }, [tagFilterArray, updateHeight, seeMoreHovered]);

  return (
    <div className="TagFilterBanner" ref={tagFilterBannerRef}>
      <div className="TagFilterBannerContent">
        <div className="TagFilterBannerContentRow">
          <p>Searching by:</p>
          <p className="ClearAllFilters" onClick={() => onClearTags()}>
            Clear all filters
          </p>
        </div>
        <div className={tagClasses} style={flexWrapStyle} ref={tagContainerRef}>
          <div className="TagFilterWrapContainer">{tags}</div>
          <div className="show-more-container">
            {tagsWrap && (
                <span
                  className="material-icons"
                  onClick={() => setSeeMoreHovered(!seeMoreHovered)}
                >
                  {!seeMoreHovered ? "more_vert" : "more_vert"}
                </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    tagFilterArray: state.tagFilterArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearTags: () => dispatch(actionCreators.clearTags()),
    onRemoveTag: (tagIdx, tagFilterArray) => {
      dispatch(actionCreators.removeTagFromFilterArray(tagIdx, tagFilterArray));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagFilterBanner);
