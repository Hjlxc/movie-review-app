import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { selectMovieData } from '../movieData';

export const sortOptions = {
  Default: () => {},
  'Voting: High to Low': (a, b) => b.vote_average - a.vote_average,
  'Voting: Low to Hight': (a, b) => a.vote_average - b.vote_average,
  'Alphabetical: Ascending': (a, b) => a.title.localeCompare(b.title),
  'Alphabetical: Descending': (a, b) => b.title.localeCompare(a.title),
  'Release Date: Recent to Old': (a, b) =>
    new Date(b.release_date) - new Date(a.release_date),
  'Release Date: Old to Recent': (a, b) =>
    new Date(a.release_date) - new Date(b.release_date),
};

export const initialState = {
  language: {}, // save the user selected language
  voting: { min: 0, max: 10, selectMin: 0, selectMax: 10 }, // save the min/max voting range
  adult: false,
  search: '',
  sort: '',
};

export const movieFilterSlice = createSlice({
  name: 'movieFilter',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      if (state.language[action.payload]) delete state.language[action.payload];
      else state.language[action.payload] = true;
    },
    setVoting: (state, action) => {
      const { selectMin, selectMax } = action.payload;
      if (selectMin !== undefined) state.voting.selectMin = selectMin;
      if (selectMax !== undefined) state.voting.selectMax = selectMax;
    },
    setAdult: (state, action) => {
      state.adult = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

const {
  setLanguage,
  setVoting,
  setAdult,
  setSearch,
  setSort,
} = movieFilterSlice.actions;

/* Actions */
export const setMovieFilterLanguage = (language) => (dispatch) =>
  dispatch(setLanguage(language));

export const setMovieFilterVoting = ({ min, max }) => (dispatch) =>
  dispatch(setVoting({ selectMin: min, selectMax: max }));

export const setMovieFilterAdult = (adult) => (dispatch) =>
  dispatch(setAdult(adult));

export const setMovieFilterSearch = (search) => (dispatch) =>
  dispatch(setSearch(search));

export const setMovieSort = (sort) => (dispatch) => dispatch(setSort(sort));

/* Selectors */
const getRawMovieFilterData = (state) => state.movieFilter;

// The purpose to have getRawMovieLanguageData as a separate function is to make sure
// reselect update the getApplyLanguageFilter only when language state change
const getRawMovieLanguageData = (state) => state.movieFilter.language;
// no language checked and all language checked should return the same result
// so we will escape language filter when not selected
export const getApplyLanguageFilter = createSelector(
  getRawMovieLanguageData,
  (languageData) => !!Object.keys(languageData).length
);

// loop all movieData and retrive all language options
// use Set to avoid duplicate
export const selectLanguageOption = createSelector(
  selectMovieData,
  (movieData) => {
    const languageSet = new Set();
    movieData.forEach((data) => languageSet.add(data.original_language));
    return Array.from(languageSet);
  }
);

export const selectFilteredMovie = createSelector(
  getRawMovieFilterData,
  selectMovieData,
  getApplyLanguageFilter,
  (filterData, movieData, applyLanguageFilter) => {
    const { language, voting, adult, search, sort } = filterData;
    const titleSet = new Set();
    const filteredMovieData = movieData.filter((data) => {
      //remove duplicate
      if (titleSet.has(data.title)) return false;
      else titleSet.add(data.title);

      // valid language
      if (applyLanguageFilter && !language[data.original_language])
        return false;

      // valid voting
      if (
        data.vote_average < voting.selectMin ||
        data.vote_average > voting.selectMax
      )
        return false;

      // valid adult
      if (adult && !data.adult) return false;

      if (search && search !== 'Default') {
        // split by space and remove enpty string (when user mistype 2 or more space together)
        const splitSearch = search.split(' ').filter((a) => a);
        for (let word of splitSearch)
          if (data.title.toLowerCase().indexOf(word.toLowerCase()) === -1)
            return false;
      }
      return true;
    });
    if (!sort || !sortOptions[sort]) return filteredMovieData;

    return filteredMovieData.sort(sortOptions[sort]);
  }
);

export const selectMovieLanguage = (state) => state.movieFilter.language;

export const selectMovieVoting = (state) => state.movieFilter.voting;

export const selectMovieAdult = (state) => state.movieFilter.adult;

export const selectMovieSearch = (state) => state.movieFilter.search;

export const selectMovieSort = (state) => state.movieFilter.sort;

export default movieFilterSlice.reducer;
