import { MOVIE_DB_ENDPOINT, POSTER_PREFIX } from '../../constants';

/**
 * fetch movie data from data base
 * @param {*} options
 * @param options.page specific a certain page to load, default is page 1
 */
export const fetchMovieFromDB = async (options = {}) => {
  const { page } = options;
  let endpoint = `${MOVIE_DB_ENDPOINT}?api_key=${
    process.env.REACT_APP_MOVIE_DB_API_KEY
  }`;

  if (page) endpoint += `&page=${page}`;

  const res = await fetch(endpoint);
  if (res.status !== 200)
    throw new Error({ message: `Fetch Data fail with status ${res.status}` });
  return res.json();
};

/**
 *
 * @param {Array} nestedArray array with nested array structure
 * the function will recursively loop and flat the nested array
 * flat is not cross platform supported, i.e., some broswer and nodejs
 *
 * return an array with all the nested array flated
 */
export const flat = (nestedArray) => {
  const recursivelyFlat = (subarray, target) => {
    for (let el of subarray) {
      // recursive flat if the element is an array, otherwise push to result
      Array.isArray(el) ? recursivelyFlat(el, target) : target.push(el);
    }
    return target;
  };
  return recursivelyFlat(nestedArray, []);
};

// parse the item data to include swatch url and rating based on 5
export const parseItemData = (item) => ({
  ...item,
  rating: item.vote_average / 2,
  swatch: `${POSTER_PREFIX}${item.poster_path}`,
});
