import { createSlice } from '@reduxjs/toolkit';

import { MOVIE_DB_ENDPOINT, MOVIE_DB_API_KEY } from '../../constants';

export const movieDataSlice = createSlice({
  name: 'movieData',
  initialState: { data: [] },
  reducers: {
    setMovieData: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { setMovieData } = movieDataSlice.actions;

export const fetchMovieData = () => async (dispatch) => {
  try {
    const data = await fetch(
      `${MOVIE_DB_ENDPOINT}?api_key=${MOVIE_DB_API_KEY}`
    ).then((res) => res.json());
    dispatch(setMovieData(data.results));
  } catch (e) {
    // handle fetch error, such as retry, etc
  }
};

export const selectMovieData = (state) => state.movieData.data;

export default movieDataSlice.reducer;
