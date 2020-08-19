import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { fetchMovieFromDB, flat } from './utils';

export const initialState = { data: [], loading: false };

export const movieDataSlice = createSlice({
  name: 'movieData',
  initialState,
  reducers: {
    setMovieData: (state, action) => {
      action.payload.forEach(
        (payloadData) => (state.data[payloadData.page - 1] = payloadData)
      );
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
const { setMovieData, setLoading } = movieDataSlice.actions;

/* Actions */
/**
 * Fetch movie data and update redux store
 * @param {Object} options
 * @param {Array[Number]|Number} options.page // either page a single page using an positive integer or multiply page with an array
 */
export const fetchMovieData = (options = {}) => async (dispatch, getState) => {
  const { movieData } = getState();
  let page = options.page || 1;

  // convert single page option into array
  if (!Array.isArray(page)) page = [page];

  const fetchPageIdx = [];

  // valid pageValue and remove already fetched page
  for (let pageValue of page) {
    if (
      Number.isNaN(pageValue) ||
      Math.floor(pageValue) !== pageValue ||
      pageValue < 1
    ) {
      throw new Error('Page must be an positive interger');
    }
    if (!movieData.data[pageValue - 1]) fetchPageIdx.push(pageValue);
  }

  if (!fetchPageIdx.length) return; // all the page has been fetched

  try {
    // fetch and update movie data state
    dispatch(setLoading(true));
    const data = await Promise.all(
      fetchPageIdx.map((pageIdx) => fetchMovieFromDB({ page: pageIdx }))
    );
    return dispatch(setMovieData(data));
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
  flat(movieData.filter((item) => !!item).map((item) => item.results))
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
