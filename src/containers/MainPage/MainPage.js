// React Imports
import React, { Component } from "react";

// Component Imports
import ThreadView from "../ThreadView/ThreadView";
import GridView from "../GridView/GridView";

// CSS Imports
import "./MainPage.scss";

// JS Imports
import { getNumberColumns, getColumnWidth } from "../../utils/DimensionHandler";

class MainPage extends Component {
  constructor(props) {
    super(props);
    let numColumns = getNumberColumns();
    let columnWidth = getColumnWidth();
    this.state = {
      modalOpen: false,
      selectedAsset: null,
      selectedAssetIdx: 0,
      numColumns: numColumns,
      autoplay: false,
      initialLoaded: false,
      columnWidth: columnWidth,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ initialLoaded: true });
    }, 0);
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    let newNumColumns = getNumberColumns();
    let newColumnWidth = getColumnWidth();
    this.setState({
      columnWidth: newColumnWidth,
      numColumns: newNumColumns,
    });
  };

  toggleModal = (selectedAsset, idx) => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      selectedAsset: selectedAsset,
      selectedAssetIdx: idx,
    });
  };

  render() {
    return (
      <>
        {/* <LoadingPage loaded={this.state.initialLoaded} /> */}
        <>
          {this.state.modalOpen ? (
            <ThreadView
              closeModal={this.toggleModal}
              selectedAsset={this.state.selectedAsset}
              selectedAssetIdx={this.state.selectedAssetIdx}
            />
          ) : null}

          <GridView
            numColumns={this.state.numColumns}
            columnWidth={this.state.columnWidth}
            toggleModal={(asset, idx) => this.toggleModal(asset, idx)}
            addTagHandler={this.addTag}
            modalOpen={this.state.modalOpen}
          />
        </>
        )
      </>
    );
  }
}

export default MainPage;
