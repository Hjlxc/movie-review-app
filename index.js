import store from './src/app/store';
import {
  initialState as movieFilterIS,
  sortOptions,
  setMovieFilterLanguage,
  setMovieFilterVoting,
  setMovieFilterAdult,
  setMovieFilterSearch,
  setMovieSort,
  selectLanguageOption,
  selectFilteredMovie,
  selectMovieLanguage,
  selectMovieVoting,
  selectMovieAdult,
  selectMovieSearch,
  selectMovieSort,
} from './src/modules';

import {
  initialState as movieDataIS,
  fetchMovieData,
  selectMovieData,
  selectFirstUnfetchedPage,
  selectHasMoreData,
  selectLoadingMovieData,
} from './src/movieData';

export const modules = {
  movieFilter: {
    initialState: movieFilterIS,
    actions: {
      setMovieFilterLanguage,
      setMovieFilterVoting,
      setMovieFilterAdult,
      setMovieFilterSearch,
      setMovieSort,
    },
    selectors: {
      selectLanguageOption,
      selectFilteredMovie,
      selectMovieLanguage,
      selectMovieVoting,
      selectMovieAdult,
      selectMovieSearch,
      selectMovieSort,
    },
    metadata: {
      sortOptions: Object.keys(sortOptions),
    },
  },
  movieData: {
    initialState: movieDataIS,
    actions: { fetchMovieData },
    selectors: {
      selectMovieData,
      selectFirstUnfetchedPage,
      selectHasMoreData,
      selectLoadingMovieData,
    },
    metadata: {},
  },
};

export default store;
