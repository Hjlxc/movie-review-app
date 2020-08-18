import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Root, Header } from './container/styledComponent';
import { fetchMovieData } from './modules/movieData';
import MovieList from './container/MovieList';

import 'antd/dist/antd.css';

function App() {
  const dispatch = useDispatch();

  // useEffect with [] as second parameter to make sure only fetch movie data once
  useEffect(() => {
    dispatch(fetchMovieData());
  }, []);

  return (
    <Root>
      <Header>Movie Review App</Header>
      <MovieList />
    </Root>
  );
}

export default App;
