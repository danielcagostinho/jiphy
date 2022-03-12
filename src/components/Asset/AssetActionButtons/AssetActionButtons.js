import React from "react";
import likeIcon from "../../../assets/icons/like.svg";

import "./AssetActionButtons.scss";

const AssetActionButtons = ({ onLikeAsset }) => {
  return (
    <div className="action-buttons">
      <img src={likeIcon} alt="Like Icon" id="like" onClick={() => onLikeAsset()} />
    </div>
  );
};

export default AssetActionButtons;
