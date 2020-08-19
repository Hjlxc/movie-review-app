import { MOVIE_DB_ENDPOINT, MOVIE_DB_API_KEY } from '../../constants';

/**
 * fetch movie data from data base
 * @param {*} options
 * @param options.page specific a certain page to load, default is page 1
 */
export const fetchMovieFromDB = async (options = {}) => {
  const { page } = options;
  let endpoint = `${MOVIE_DB_ENDPOINT}?api_key=${MOVIE_DB_API_KEY}`;

  if (
    page !== undefined &&
    (Number.isNaN(page) || Math.floor(page) !== page || page < 1)
  )
    throw new Error('Page must be an positive interger');

  if (page) endpoint += `&page=${page}`;

  const res = await fetch(endpoint);
  if (res.status !== 200)
    throw new Error({ message: `Fetch Data fail with status ${res.status}` });
  return res.json();
};
