import { createSlice } from '@reduxjs/toolkit';

import { fetchMovieFromDB } from './utils';

export const movieDataSlice = createSlice({
  name: 'movieData',
  initialState: [],
  reducers: {
    setMovieData: (state, action) => {
      state[action.payload.page - 1] = action.payload;
    },
  },
});

const { setMovieData } = movieDataSlice.actions;

// fetch the data of a given page, if provided
export const fetchMovieData = (options = {}) => async (dispatch, getState) => {
  const { movieData } = getState();
  const page = options.page || 1;
  if (movieData[page - 1]) return;
  try {
    // fetch and update movie data state
    const data = await fetchMovieFromDB(options);
    dispatch(setMovieData(data));
  } catch (e) {
    // handle fetch error, such as retry, etc
  }
};

// retrive the existing movie data from state and return it in order
export const selectMovieData = ({ movieData }) =>
  movieData
    .filter((item) => !!item)
    .map((item) => item.results)
    .flat();

// finding the first page that has not being fetched
// searching from page 1
export const getFirstUnfetchedPage = ({ movieData }) => {
  let pageIdx = 0;

  // break the loop when encounter a null or undefined data
  // then increase the idx by one, this increase will compensate the
  // offset between page idx and array idx
  while (movieData[pageIdx++]) {}

  return pageIdx;
};

export default movieDataSlice.reducer;
