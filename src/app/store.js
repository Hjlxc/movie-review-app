import { configureStore } from '@reduxjs/toolkit';
import movieDataReducer from '../modules/movieData';

export default configureStore({
  reducer: {
    movieData: movieDataReducer,
  },
});
