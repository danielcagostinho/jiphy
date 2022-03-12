// React Imports
import React, { PureComponent } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components Imports
import Asset from "../Asset";
import AssetActionSheet from "../AssetActionSheet/AssetActionSheet";

// CSS Imports
import "./AssetCard.scss";

class AssetCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };

    this.onHoverEnterHandler.bind(this);
    this.onHoverExitHandler.bind(this);
  }

  onHoverEnterHandler = () => {
    this.setState({ hovered: true });
  };

  onHoverExitHandler = () => {
    this.setState({ hovered: false });
  };

  render() {
    return (
      <AnimatePresence>
        <motion.div
          className="asset-container"
          onMouseEnter={() => this.onHoverEnterHandler()}
          onMouseLeave={() => this.onHoverExitHandler()}
          key={this.props.asset.originName}
          style={{ width: this.props.columnWidth }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {this.state.hovered && (
            <>
              <AssetActionSheet
                asset={this.props.asset}
                src={this.props.asset.originName}
                likeAsset={this.props.likeAsset}
                dimensions={this.props.assetDetails.dimensions}
              />
            </>
          )}
          <div className="asset-overlay" onClick={() => this.props.clicked()}>
            <Asset
              modalOpen={this.props.modalOpen}
              asset={this.props.asset}
              assetDetails={this.props.assetDetails}
              muted={true}
              paused={this.props.paused}
              parent="grid"
              columnWidth={this.props.columnWidth}
              gridIndex={this.props.gridIndex}
              removeErrorAsset={(assetId) =>
                this.props.removeErrorAsset(assetId)
              }
            />
            {this.props.asset.hasAudio && (
              <div className="sound-pill">
                <i className="material-icons icon">audiotrack</i>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}

export default AssetCard;
