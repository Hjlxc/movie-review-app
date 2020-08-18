import { createSlice } from '@reduxjs/toolkit';

import { fetchMovieFromDB } from './utils';

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
    // fetch and update movie data state
    const data = await fetchMovieFromDB();
    dispatch(setMovieData(data.results));
  } catch (e) {
    // handle fetch error, such as retry, etc
  }
};

export const selectMovieData = (state) => state.movieData.data;

export default movieDataSlice.reducer;
