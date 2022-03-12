import React, { Component } from "react";

import AssetActionButtons from "../../components/Asset/AssetActionButtons/AssetActionButtons";
import Asset from "../../components/Asset/Asset";
import * as actionCreators from "../../store/actions/actions";
import { connect } from "react-redux";

import "./ThreadView.scss";
import { parseSrcString } from "../../utils/utils";
import { getFullScreenDimensions } from "../../utils/DimensionHandler";
import NavigationArrow from "../../components/UI/NavigationArrow/NavigationArrow";

class ThreadView extends Component {
  constructor(props) {
    super(props);
    let dimensions = getFullScreenDimensions(this.props.selectedAsset);
    this.state = {
      loading: false,
      selectedAsset: this.props.selectedAsset,
      selectedAssetIdx: this.props.selectedAssetIdx,
      width: dimensions.width,
      height: dimensions.height,
    };
  }

  updateDimensions = (asset) => {
    let dimensions = getFullScreenDimensions(asset);
    this.setState({ width: dimensions.width, height: dimensions.height });
  };

  componentDidMount() {
    document.addEventListener("keydown", this.navigationKeyFunction, false);
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.navigationKeyFunction, false);
    window.removeEventListener("resize", this.updateDimensions);
  }

  next = () => {
    if (!this.props.isFetchingNewAssets) {
      let nextId = Math.min(
        this.state.selectedAssetIdx + 1,
        this.props.assetsLength
      );
      let nextAsset = this.props.assets[nextId];
      this.setState({ selectedAssetIdx: nextId, selectedAsset: nextAsset });
      this.updateDimensions(nextAsset);
    }
  };

  previous = () => {
    if (!this.props.isFetchingNewAssets) {
      let previousIdx = Math.max(this.state.selectedAssetIdx - 1, 0);
      let previousAsset = this.props.assets[previousIdx];
      this.setState({
        selectedAssetIdx: previousIdx,
        selectedAsset: previousAsset,
      });
      this.updateDimensions(previousAsset);
    }
  };

  navigationKeyFunction = (e) => {
    switch (e.keyCode) {
      case 37: // LEFT
        this.previous();
        break;
      case 39: // RIGHT
        this.next();
        break;
      case 27: // ESC
        this.props.closeModal();
        break;
      default:
        break;
    }
  };

  render() {
    let clickListener = (event) => {
      event.preventDefault();
      if (event.target === event.currentTarget) {
        this.props.closeModal();
      }
    };

    let parsedUrl, assetType;
    if (this.state.selectedAsset.contentMp4 !== "") {
      parsedUrl = parseSrcString(this.state.selectedAsset.contentMp4);
      assetType = "mp4";
    } else if (this.state.selectedAsset.contentWebm !== "") {
      parsedUrl = parseSrcString(this.state.selectedAsset.contentWebm);
      assetType = "webm";
    } else {
      parsedUrl = this.state.selectedAsset.gifUrl;
      assetType = "gif";
    }

    let assetDetails = {
      dimensions: {
        width: this.state.width,
        height: this.state.height,
      },
      assetSrc: parsedUrl,
      assetType: assetType,
      parentType: "thread",
    };

    let dimensionStyles = {
      width: this.state.width,
      height: this.state.height,
    };

    if (this.state.selectedAssetIdx > this.props.assetsLength - 7) {
      if (!this.props.isFetchingNewAssets) {
        this.props.onRefillBuffer();
        if (this.props.assetsLength >= this.props.assetQueueLength - 40) {
          this.props.onFetchNewAssets();
        }
      }
    }

    return (
      <div className="ThreadView">
        <div className="Backsplash" onClick={clickListener}>
          <div
            className="ThreadViewContent FlexColumnCenter"
            onClick={clickListener}
          >
            <div className="FlexColumnCenter" onClick={clickListener}>
              <div className="ThreadAssetContainer" onClick={clickListener}>
                <NavigationArrow
                  variant="left"
                  navigationListener={() => this.previous()}
                  disabled={this.state.selectedAssetIdx === 0}
                />
                <div className="ThreadViewAsset" style={dimensionStyles}>
                  <Asset
                    assetDetails={assetDetails}
                    muted={false}
                    parent="thread"
                    key={this.state.selectedAssetIdx}
                  />
                </div>
                <NavigationArrow
                  variant="right"
                  navigationListener={() => this.next()}
                  disabled={false}
                />
              </div>
              <AssetActionButtons
                asset={this.props.selectedAsset}
                onLikeAsset={() => {
                  this.props.onLikeAsset(this.props.selectedAsset);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.assets,
    assetsLength: state.assetsLength,
    assetQueueLength: state.assetQueueLength,
    isFetchingNewAssets: state.isFetchingNewAssets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLikeAsset: (asset) => dispatch(actionCreators.likeAsset(asset)),
    onFetchNewAssets: () => dispatch(actionCreators.fetchNewAssets()),
    onRefillBuffer: () => dispatch(actionCreators.refillBuffer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadView);
