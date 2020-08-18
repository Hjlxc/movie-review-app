import { configureStore } from '@reduxjs/toolkit';
import movieDataReducer from '../modules/movieData';
import movieFilterReducer from '../modules/movieFilter';
export default configureStore({
  reducer: {
    movieData: movieDataReducer,
    movieFilter: movieFilterReducer,
  },
});
