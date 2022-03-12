const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs/'
});

export default instance;