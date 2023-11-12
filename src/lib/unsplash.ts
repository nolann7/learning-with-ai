import axios from 'axios';
export const getUnsplashImage = async (query: string) => {
  const { data } = await axios.get(`
    https://api.unsplash.com/search/photos?per_page=1&query=${query}&client_id=${process.env.UNSPLASH_API_KEY}
    `);

  // const response = await fetch(`
  //   https://api.unsplash.com/search/photos?per_page=1&query=${query}&client_id=${process.env.UNSPLASH_API_KEY}
  //   `);
  // const data = await response.json();
  return data.results[0].urls.small_s3;
};
