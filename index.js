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
} from './src/modules/movieFilter';

import {
  initialState as movieDataIS,
  fetchMovieData,
  selectMovieData,
  selectFirstUnfetchedPage,
  selectHasMoreData,
  selectLoadingMovieData,
} from './src/modules/movieData';

import { parseItemData } from './src/modules/movieData/utils';

const modules = {
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
const utils = {
  parseItemData,
};

export default store;
export { modules, utils };
