import * as actionTypes from "./actions/actions";

const BUFFER_SIZE = 15;

const initialState = {
  assets: [],
  assetQueue: [],
  assetsLength: 0,
  assetQueueLength: 0,
  isFetchingNewAssets: false,
  searchTerm: null,
  tagFilterArray: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Make an API call and add more assets in the queue
    // Started: Set fetching assets to true
    case actionTypes.FETCHNEWASSETS_STARTED: {
      return {
        ...state,
        isFetchingNewAssets: true,
        searchTerm: null,
      };
    }

    // Success: Concat the new assets with the assets queue increase the size of the "buffer" by buffer size
    case actionTypes.FETCHNEWASSETS_SUCCESS: {
      console.log("reducer fetch new assets: ", action.value)
      let newAssets = action.value;
      let assetsLength = state.assetsLength + BUFFER_SIZE;
      let updatedAssetQueue = state.assetQueue.concat(newAssets);
      let updatedAssets = updatedAssetQueue.slice(0, assetsLength);
      // console.log("assets after fetch success, length",newAssets,assetsLength)
      return {
        ...state,
        assets: updatedAssets,
        assetQueue: updatedAssetQueue,
        assetsLength: assetsLength,
        assetQueueLength: updatedAssetQueue.length,
        isFetchingNewAssets: false,
      };
    }
    // Failure: For now console.log an error message
    case actionTypes.FETCHNEWASSETS_FAILED: {
      return {
        ...state,
        isFetchingNewAssets: false,
      };
    }

    // When the infinite scroll has assets currently and is looking to add more content
    case actionTypes.REFILLBUFFER: {
      if (state.isFetchingNewAssets) {
        return state;
      } else {
        let assetsLength = state.assetsLength + BUFFER_SIZE;
        let updatedAssets = state.assetQueue.slice(0, assetsLength);

        return {
          ...state,
          assets: updatedAssets,
          assetsLength: assetsLength,
        };
      }
    }

    // Liking an Asset
    // Started: Set Fetching Assets to true, take an initial asset that they liked to add to the top of the buffer
    case actionTypes.LIKEASSET_STARTED: {
      let tags =
        action.value.tags.length < 1
          ? []
          : action.value.tags
              .substring(1, action.value.tags.length - 1)
              .split(",");
      // console.log("asset liked tags", tags);
      return {
        ...state,
        // assets: [],
        // assetsLength: 0,
        // assetQueueLength: 0,
        isFetchingNewAssets: true,
        // searchTerm: null,
        tagFilterArray: tags,
      };
    }

    // Success: set AssetsQueue to returned assets from Like Api call, concat to the liked asset
    case actionTypes.LIKEASSET_SUCCESS: {
      return {
        ...state,
        // isFetchingNewAssets: false,
      };
    }

    // Failed: Maybe give an error message like could not like asset
    case actionTypes.LIKEASSET_FAILED: {
      // Since the asset queue is still intact, we can just restore the buffer
      let assetsLength = state.assetsLength + BUFFER_SIZE;
      let updatedAssets = state.assetQueue.slice(0, assetsLength);
      return {
        ...state,
        assets: updatedAssets,
        isFetchingNewAssets: false,
      };
    }

    case actionTypes.CLEAR_QUEUE: {
      let emptyQueue = [];
      return {
        ...state,
        assets: emptyQueue,
        assetQueue: emptyQueue,
        assetsLength: 0,
        assetQueueLength: 0,
      };
    }

    // Search Tag: API returns asset that are based on the search term
    // Started: Set search term
    case actionTypes.SEARCHTAG_STARTED: {
      return {
        ...state,
        isFetchingNewAssets: true,
        searchTerm: action.value,
      };
    }

    // Success: Set queue equal to the returned results
    case actionTypes.SEARCHTAG_SUCCESS: {
      let updatedAssetQueue = action.value;
      let assetsLength = Math.min(
        state.assetsLength + BUFFER_SIZE,
        updatedAssetQueue.length
      );
      let updatedAssets = updatedAssetQueue.slice(0, assetsLength);
      return {
        ...state,
        assets: updatedAssets,
        assetsLength: assetsLength,
        assetQueue: updatedAssetQueue,
        assetQueueLength: updatedAssetQueue.length,
        isFetchingNewAssets: false,
      };
    }

    case actionTypes.SEARCHTAG_FAILED: {
      return {
        ...state,
        isFetchingNewAssets: false,
        searchTerm: null,
      };
    }

    case actionTypes.ADD_TO_TAG_FILTER_STARTED: {
      let newFilterArray = [...state.tagFilterArray];
      if (!newFilterArray.includes(action.value)) {
        newFilterArray.push(action.value);
      } 
      return {
        ...state,
        isFetchingNewAssets: false,
        tagFilterArray: newFilterArray,
      };
    }

    case actionTypes.REMOVE_TAG_FROM_FILTER_STARTED: {
      let newFilterArray = [...state.tagFilterArray];
      newFilterArray.splice(action.value, 1);
      return {
        ...state,
        isFetchingNewAssets: false,
        tagFilterArray: newFilterArray,
      };
    }

    case actionTypes.CLEAR_TAGS: {
      return {
        ...state,
        isFetchingNewAssets: false,
        tagFilterArray: [],
      };
    }

    case actionTypes.REMOVE_ERROR_ASSET: {
      console.log("reducer trying to remove error asset", action.value)
      const oldAssets = [...state.assets];
      console.log("assets pre removal", oldAssets.length);
      oldAssets.splice(action.value, 1);
      console.log("assets after removal", oldAssets.length);
      return {
        ...state,
        assets: oldAssets
      }
    }

    default:
      return state;
  }
};

export default reducer;
