const MAX_WIDTH_PCT = 0.8;
const MAX_HEIGHT_PCT = 0.9;

export const calculateAspectRatioFit = (
  maxWidth,
  maxHeight,
  srcWidth,
  srcHeight
) => {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

export const getNumberColumns = () => {
  let numberOfColumns =
    window.innerWidth > 1400 ? 3 : window.innerWidth > 1000 ? 2 : 1;
  return numberOfColumns;
};

export const getContentWidth = () => {
  let contentWidth = window.innerWidth < 1000 ? 0.95 : 0.75
  return contentWidth;
}

export const getContentWidthPx = () => {
  let contentWidthPx = getContentWidth() * window.innerWidth;
  return contentWidthPx;
}

export const getTotalPadding = () => {
  let totalPadding = getNumberColumns() === 3 ? 40 : getNumberColumns() === 2 ? 20 : 0;
  return totalPadding;
}

export const getColumnWidth = () => {
  let columnWidth = (window.innerWidth * getContentWidth()) / getNumberColumns();
  return columnWidth;
}

export const getContentWidthPadded = () => {
  let contentWidthPadded = getContentWidthPx() + getTotalPadding();
  return contentWidthPadded;
}

export const getAssetHeight = (srcWidth, srcHeight) => {
  let aspectRatio = srcWidth / srcHeight;
  let assetHeight = getColumnWidth() / aspectRatio;
  return assetHeight;
}

export const getFullScreenDimensions = (asset) => {
  let maxWidth = MAX_WIDTH_PCT * window.innerWidth;
    let maxHeight = MAX_HEIGHT_PCT * window.innerHeight;
    let { width, height } = calculateAspectRatioFit(
      maxWidth,
      maxHeight,
      asset.width,
      asset.height
    );
    let dimensions = { width, height };
    return dimensions;
}

export const isMobile = () => {
  return window.innerWidth < 800;
}
