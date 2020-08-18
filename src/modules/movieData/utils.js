import { MOVIE_DB_ENDPOINT, MOVIE_DB_API_KEY } from '../../constants';

export const fetchMovieFromDB = async () => {
  const res = await fetch(`${MOVIE_DB_ENDPOINT}?api_key=${MOVIE_DB_API_KEY}`);
  if (res.status !== 200)
    throw new Error({ message: `Fetch Data fail with status ${res.status}` });
  return res.json();
};
