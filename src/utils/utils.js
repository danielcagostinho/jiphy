export const parseSrcString = (srcString) => {
  let json = "";
  try {
    json = JSON.parse(srcString.replace(/'/g, '"'));
  } catch (e) {
    console.error(e);
  }
  return json.url;
};

export const formatTagsOneStringForPutRequest = (tags) => {
  return `${tags.toString()}`.replace(/['"]+/g, '');
}

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};