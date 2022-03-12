// React Imports
import { connect } from "react-redux";

// Redux Imports
import React, { Component } from "react";
import * as actionCreators from "../../store/actions/actions";

// Component Imports
import TagFilterBanner from "../../components/TagFilterBanner/TagFilterBanner";
import AssetCard from "../../components/Asset/AssetCard/AssetCard";
import InfiniteScroll from "react-infinite-scroll-component";
import BannerMessage from "../../components/UI/BannerMessage/BannerMessage";

// CSS Imports
import "./GridView.scss";
import {
  getContentWidthPadded,
  getAssetHeight,
} from "../../utils/DimensionHandler";

class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      gridContentPaddingTop: 84,
      tagFilterBannerRef: React.createRef(null),
    };
  }

  componentDidMount = () => {
    this.props.onFetchNewAssets();
  };

  updateGridContentPaddingTop = (height) => {
    this.setState({ gridContentPaddingTop: height });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextProps.assets !== this.props.assets ||
      nextProps.numColumns !== this.props.numColumns ||
      nextProps.columnWidth !== this.props.columnWidth ||
      nextProps.modalOpen !== this.props.modalOpen ||
      nextState.paused !== this.state.paused ||
      nextProps.isFetchingNewAssets !== this.props.isFetchingNewAssets ||
      nextProps.tagFilterArray !== this.props.tagFilterArray ||
      nextState.gridContentPaddingTop !== this.state.gridContentPaddingTop
    );
  };

  removeErrorAsset = (assetIndex) => {
    // console.log("trying to remove asset", assetIndex);
    // this.props.onRemoveErrorAsset(assetIndex);
  };

  fillColumns = () => {
    let cols = [];
    for (let columnI = 0; columnI < this.props.numColumns; columnI++) {
      let filteredAssets = this.props.assets.filter(
        (asset, idx) => idx % 3 === columnI
      );

      cols.push(
        <div className="GridColumn" key={columnI}>
          {filteredAssets.map((asset, assetIdx) => {
            let parsedUrl, assetType;
            parsedUrl = asset.gifUrl;
            assetType = "gif";

            let id = 3 * assetIdx + columnI;
            let thumbnail = asset.posterUrl;
            let src = parsedUrl;
            let newHeight = getAssetHeight(asset.width, asset.height);
            let assetDetails = {
              dimensions: {
                width: this.props.columnWidth,
                height: newHeight,
              },
              assetSrc: src,
              assetType: assetType,
              parentType: "grid",
              thumbnail: thumbnail,
            };
            return (
              <AssetCard
                modalOpen={this.props.modalOpen}
                assetDetails={assetDetails}
                columnWidth={this.props.columnWidth}
                asset={asset}
                key={id}
                gridIndex={id}
                likeAsset={() => {
                  this.props.onLikeAsset(asset);
                }}
                clicked={() => this.props.toggleModal(asset, id)}
                paused={this.state.paused || this.props.modalOpen}
                removeErrorAsset={(assetId) => this.removeErrorAsset(assetId)}
              />
            );
          })}
        </div>
      );
    }
    return cols;
  };

  render() {
    let scrollDisplay = (
      <InfiniteScroll
        className="content"
        dataLength={this.props.assetsLength / 5}
        next={() => {
          if (!this.props.isFetchingNewAssets) {
            this.props.onRefillBuffer();
            if (this.props.assetsLength >= this.props.assetQueueLength - 40) {
              this.props.onFetchNewAssets(this.props.tagFilterArray);
            }
          }
        }}
        style={!this.props.searchTerm ? {} : { paddingTop: 64 }}
        hasMore={true}
        loader={<BannerMessage variant={"loading"} />}
      >
        {this.fillColumns()}
      </InfiniteScroll>
    );

    let getGridViewContent = () => {
      if (this.props.isFetchingNewAssets && this.props.assetsLength === 0) {
        return <BannerMessage variant={"loading"} />;
      } else {
        if (this.props.assetsLength === 0) {
          return <BannerMessage variant={"results"} />;
        } else {
          return scrollDisplay;
        }
      }
    };

    return (
      <>
        <div
          className="GridContent"
          style={{
            width: getContentWidthPadded(),
          }}
        >
          {this.props.tagFilterArray.length > 0 ? (
            <TagFilterBanner updateHeight={this.updateGridContentPaddingTop} />
          ) : null}
          <div
            style={{
              paddingTop: this.state.gridContentPaddingTop,
            }}
          >
            {getGridViewContent()}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    assets: state.assets,
    assetsLength: state.assetsLength,
    assetQueueLength: state.assetQueueLength,
    isFetchingNewAssets: state.isFetchingNewAssets,
    searchTerm: state.searchTerm,
    tagFilterArray: state.tagFilterArray,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchNewAssets: () => dispatch(actionCreators.fetchNewAssets()),
    onRefillBuffer: () => dispatch(actionCreators.refillBuffer()),
    onLikeAsset: (asset) => dispatch(actionCreators.likeAsset(asset)),
    onRemoveErrorAsset: (gridIndex) =>
      dispatch(actionCreators.removeErrorAsset(gridIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridView);
