import React, { PureComponent } from "react";
import { InView } from "react-intersection-observer";
import Video from "./Video/Video";
import Gif from "./Gif/Gif";

import "./Asset.scss";

class Asset extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      hovered: false,
      isVisible: false,
    };
  }

  render() {
    let contentType = this.props.assetDetails.assetType;
    let src = this.props.assetDetails.assetSrc;

    let assetDisplay = null;
    switch (contentType) {
      case "gif":
        assetDisplay = (
          <Gif
            parent={this.props.parent}
            thumbnail={this.props.assetDetails.thumbnail}
            dimensions={this.props.assetDetails.dimensions}
            src={src}
            isVisible={this.state.isVisible}
            paused={this.props.paused}
            modalOpen={this.props.modalOpen}
            gridIndex={this.props.gridIndex}
            removeErrorAsset={(assetId) => this.props.removeErrorAsset(assetId)}
          />
        );
        break;
      case ".mp4":
      case "mp4":
      case ".webm":
      case "webm":
        assetDisplay = (
          <Video
            parent={this.props.parent}
            dimensions={this.props.assetDetails.dimensions}
            src={src}
            contentType={contentType}
            muted={this.props.muted}
            isVisible={this.state.isVisible}
            modalOpen={this.props.modalOpen}
            paused={this.props.paused}
          />
        );
        break;
      default:
        break;
    }
    return (
      <div
        className="asset"
        style={{
          height: this.props.assetDetails.dimensions.height,
          width: this.props.assetDetails.dimensions.width,
          backgroundColor: this.props.parent === "grid" ? "#0d0d0d" : "none",
        }}
      >
        <InView
          onChange={(isVisible) => {
            this.setState({ isVisible: isVisible });
          }}
          threshold={0.1}
        >
          {({ inView, ref, entry }) => {
            return (
              <div
                ref={ref}
                style={{
                  height: this.props.assetDetails.dimensions.height,
                  width: this.props.assetDetails.dimensions.width,
                }}
              >
                {assetDisplay}
              </div>
            );
          }}
        </InView>
      </div>
    );
  }
}

export default Asset;
