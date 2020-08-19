import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { fetchMovieFromDB } from './utils';

export const movieDataSlice = createSlice({
  name: 'movieData',
  initialState: { data: [], loading: false },
  reducers: {
    setMovieData: (state, action) => {
      state.data[action.payload.page - 1] = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { setMovieData, setLoading } = movieDataSlice.actions;

/* Actions */
// fetch the data of a given page, if provided
export const fetchMovieData = (options = {}) => async (dispatch, getState) => {
  const { movieData } = getState();
  const page = options.page || 1;
  if (movieData.data[page - 1]) return;
  try {
    // fetch and update movie data state
    dispatch(setLoading(true));
    const data = await fetchMovieFromDB(options);
    dispatch(setMovieData(data));
  } catch (e) {
    console.error(e);
    // handle fetch error, such as retry, etc
  }
};

/* Selectors */

/* default selector should return the state directly without any logic
it is used to get raw data from redux store and should only use internally */
const getRawMovieData = (state) => state.movieData.data;

/* wrappered selector with logic using reselect that export and used by the app
the reselect library will cache the result unless related store changes */

// retrive the existing movie data from state and return it in order
export const selectMovieData = createSelector(getRawMovieData, (movieData) =>
  movieData
    .filter((item) => !!item)
    .map((item) => item.results)
    .flat()
);

// finding the first page that has not being fetched
// searching from page 1
export const selectFirstUnfetchedPage = createSelector(
  getRawMovieData,
  (movieData) => {
    let pageIdx = 0;
    // break the loop when encounter a null or undefined data
    // then increase the idx by one, this increase will compensate the
    // offset between page idx and array idx
    while (movieData[pageIdx++]) {}

    return pageIdx;
  }
);

// return false if all movieData has being fetched, otherwise, true
export const selectHasMoreData = createSelector(
  getRawMovieData,
  selectFirstUnfetchedPage,
  (movieData, unfetchedPage) =>
    !movieData.length || unfetchedPage <= movieData[0].total_pages
);

export const selectLoadingMovieData = (state) => state.movieData.loading;

export default movieDataSlice.reducer;
