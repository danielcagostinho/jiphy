// React Imports
import React from "react";
import ReactTooltip from "react-tooltip";

// Redux Imports
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";

// Asset Imports
import tagIcon from "../../assets/icons/tag.svg";
import clearIcon from "../../assets/icons/clear.svg";

// JS Imports
import { getColumnWidth } from "../../utils/DimensionHandler";

// CSS Imports
import "./Tag.scss";

const Tag = ({
  tagFilterArray,
  onAddToTagFilterArray,
  value,
  variant,
  clickHandler,
  seeMoreListener,
}) => {
  let iconSrc = variant === "TagFilterBanner" ? clearIcon : tagIcon;
  let clickAction =
    variant === "TagFilterBanner"
      ? clickHandler
      : (tag) => {
          let arrayToPush = [];
          if (tagFilterArray.length > 0) {
            arrayToPush = tagFilterArray;
          }
          onAddToTagFilterArray(tag, arrayToPush);
        };
  let iconClass = variant === "TagFilterBanner" ? "clear-icon" : "tag-icon";
  let pClass = variant === "TagFilterBanner" ? "clear-p" : "tag-p";

  return (
    <div
      className="tag"
      onMouseEnter={() => seeMoreListener && seeMoreListener(true)}
      onMouseLeave={() => seeMoreListener && seeMoreListener(false)}
    >
      <div onClick={() => clickAction(value)}>
        {variant !== "SeeMore" && (
          <img src={iconSrc} alt="Tag Icon" className={iconClass} />
        )}
        <p
          className={pClass}
          data-tip={value}
          style={{
            maxWidth:
              variant === "TagFilterBanner"
                ? getColumnWidth()
                : getColumnWidth() / 5,
            textOverflow: "ellipsis",
            overflow: value === "Clear filter" ? "visible" : "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {variant !== "SeeMore" ? value : "See More"}
        </p>
        <ReactTooltip />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    tagFilterArray: state.tagFilterArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToTagFilterArray: (tag, tagFilterArray) =>
      dispatch(actionCreators.addToTagFilterArray(tag, tagFilterArray)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
