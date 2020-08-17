import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Root, Header, Body } from './container/styledComponent';
import { fetchMovieData } from './modules/movieData';

function App() {
  const dispatch = useDispatch();

  // useEffect with [] as second parameter to make sure only fetch movie data once
  useEffect(() => {
    dispatch(fetchMovieData());
  }, []);

  return (
    <Root>
      <Header>Movie Review App</Header>
      <Body>Body</Body>
    </Root>
  );
}

export default App;
