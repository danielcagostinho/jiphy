import gifsexplorerApi from "../../api/gifsexplorer";
import { formatTagsOneStringForPutRequest } from "../../utils/utils";

/* Fetch More Assets */
export const FETCHNEWASSETS_STARTED = "FETCHNEWASSETS_STARTED";
export const FETCHNEWASSETS_FAILED = "FETCHNEWASSETS_FAILED";
export const FETCHNEWASSETS_SUCCESS = "FETCHNEWASSETS_SUCCESS";

/* Fill Buffer */
export const REFILLBUFFER = "FILLBUFFER";

/* CLear Queue */
export const CLEAR_QUEUE = "CLEAR_QUEUE";
export const CLEAR_TAGS = "CLEAR_TAGS";

/* Like Asset Actions */
export const LIKEASSET_SUCCESS = "LIKEASSET_SUCCESS";
export const LIKEASSET_STARTED = "LIKEASSET_STARTED";
export const LIKEASSET_FAILED = "LIKEASSET_FAILED";

export const SEARCHTAG_STARTED = "SEARCHTAG_STARTED";
export const SEARCHTAG_FAILED = "SEARCHTAG_FAILED";
export const SEARCHTAG_SUCCESS = "SEARCHTAG_SUCCESS";

export const ADD_TO_TAG_FILTER_STARTED = "ADD_TO_FILTER_STARTED";
export const ADD_TO_TAG_FILTER_FAILED = "ADD_TO_FILTER_FAILED";

export const REMOVE_TAG_FROM_FILTER_STARTED = "REMOVE_TAG_FROM_FILTER_STARTED";
export const REMOVE_TAG_FROM_FILTER_FAILED = "REMOVE_TAG_FROM_FILTER_FAILED";

export const REMOVE_ERROR_ASSET = "REMOVE_ERROR_ASSET";
export const REMOVE_ERROR_ASSET_FAILED = "REMOVE_ERROR_ASSET_FAILED";

export const ASSET_LOAD_AMOUNT = 10;

const assetType = "Assets";

const fetchNewAssetsStarted = () => {
  return {
    type: FETCHNEWASSETS_STARTED,
  };
};

const fetchNewAssetsSuccess = (newAssets) => {
  return {
    type: FETCHNEWASSETS_SUCCESS,
    value: newAssets,
  };
};

const fetchNewAssetsFailed = (err) => {
  return {
    type: FETCHNEWASSETS_FAILED,
    value: err,
  };
};

export const fetchNewAssets = (tagFilterArray = []) => {
  return async (dispatch) => {
    dispatch(fetchNewAssetsStarted());
    try {
      let newAssets = await gifsexplorerApi.put(
        `/${assetType}/GetAssets/${ASSET_LOAD_AMOUNT}`,
        {
          tags:
            tagFilterArray.length === 0
              ? "[]"
              : formatTagsOneStringForPutRequest(tagFilterArray.toString()),
          liked: false,
        }
      );
      dispatch(fetchNewAssetsSuccess(newAssets.data));
    } catch (err) {
      dispatch(fetchNewAssetsFailed(err.response));
    }
  };
};

export const refillBuffer = () => {
  return {
    type: REFILLBUFFER,
  };
};

const likeAssetStarted = (asset) => {
  return {
    type: LIKEASSET_STARTED,
    value: asset,
  };
};

const likeAssetFailed = () => {
  return {
    type: LIKEASSET_FAILED,
  };
};

const likeAssetSuccess = (postLikeAssets) => {
  return {
    type: LIKEASSET_SUCCESS,
    value: postLikeAssets,
  };
};

export const clearQueue = () => {
  return {
    type: CLEAR_QUEUE,
  };
};

export const likeAsset = (asset) => {
  const formattedTags = asset.tags
    .substring(1, asset.tags.length - 1)
    .split(",");
  return async (dispatch) => {
    dispatch(clearQueue());
    try {
      dispatch(likeAssetStarted(asset));
      dispatch(fetchNewAssets(formattedTags));
      dispatch(likeAssetSuccess());
    } catch (err) {
      dispatch(likeAssetFailed());
    }
  };
};

const searchTagStarted = (tag) => {
  return {
    type: SEARCHTAG_STARTED,
    value: tag,
  };
};

const searchTagFailed = (error) => {
  return {
    type: SEARCHTAG_FAILED,
    error,
  };
};

const searchTagAction = (filteredAssets) => {
  return {
    type: SEARCHTAG_SUCCESS,
    value: filteredAssets,
  };
};

export const searchTag = (tag) => {
  return async (dispatch) => {
    dispatch(clearQueue());
    try {
      dispatch(searchTagStarted(tag));
      let filteredAssets = await gifsexplorerApi.get(
        `/${assetType}/ListByTag/${tag}`
      );
      dispatch(searchTagAction(filteredAssets.data));
    } catch (err) {
      searchTagFailed(err.response);
    }
  };
};

const addToTagFilterArrayStarted = (tag) => {
  return {
    type: ADD_TO_TAG_FILTER_STARTED,
    value: tag,
  };
};

const addToTagFilterArrayFailed = (error) => {
  return {
    type: ADD_TO_TAG_FILTER_FAILED,
    error,
  };
};

export const addToTagFilterArray = (tag, tagFilterArray) => {
  const tags = [...tagFilterArray].concat(tag);
  return async (dispatch) => {
    try {
      dispatch(addToTagFilterArrayStarted(tag));
      dispatch(clearQueue());
      dispatch(fetchNewAssets(tags));
    } catch (err) {
      dispatch(addToTagFilterArrayFailed(err.response));
    }
  };
};

const removeFromFilterArrayStarted = (tagIdx) => {
  return {
    type: REMOVE_TAG_FROM_FILTER_STARTED,
    value: tagIdx,
  };
};

const removeFromFilterArrayFailed = (error) => {
  return {
    type: REMOVE_TAG_FROM_FILTER_FAILED,
    error,
  };
};

export const removeTagFromFilterArray = (tagIdx, tagFilterArray) => {
  return async (dispatch) => {
    try {
      const newArray = [...tagFilterArray];
      newArray.splice(tagIdx, 1);
      dispatch(removeFromFilterArrayStarted(tagIdx));
      dispatch(clearQueue());
      dispatch(fetchNewAssets(newArray));
    } catch (err) {
      dispatch(removeFromFilterArrayFailed(err.response));
    }
  };
};

const clearTagsAction = () => {
  return {
    type: CLEAR_TAGS,
  };
};

export const clearTags = () => {
  return async (dispatch) => {
    try {
      dispatch(clearTagsAction());
      dispatch(clearQueue());
      dispatch(fetchNewAssets());
    } catch (err) {
      dispatch(addToTagFilterArrayFailed(err.response));
    }
  };
};

const removeErrorAssetAction = (gridIndex) => {
  return {
    type: REMOVE_ERROR_ASSET,
    value: gridIndex,
  };
};

const removeErrorAssetFailed = () => {
  return {
    type: REMOVE_ERROR_ASSET_FAILED,
  };
};

export const removeErrorAsset = (gridIndex) => {
  return async (dispatch) => {
    try {
      dispatch(removeErrorAssetAction(gridIndex));
    } catch (err) {
      dispatch(removeErrorAssetFailed());
    }
  };
};
