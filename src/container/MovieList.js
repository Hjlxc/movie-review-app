import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { List, Avatar } from 'antd';

import { Body } from './styledComponent';
import { selectMovieData } from '../modules/movieData';
import MovieItem from '../component/MovieItem';
import { POSTER_PREFIX } from '../constants';

export default function MovieList() {
  // window resize handler
  const handleResize = () => {
    if (!bodyRef.current) return;
    setWidth(bodyRef.current.offsetWidth);
  };

  const bodyRef = useRef(null);

  const [width, setWidth] = useState(0);
  useEffect(
    () => {
      // initial and update width property to dymanically update grid
      setWidth(bodyRef.current.offsetWidth);
      window.addEventListener('resize', handleResize);

      // clean the resize event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
    [bodyRef.current]
  );

  // get movieList from redux store
  const movieList = useSelector(selectMovieData);

  const renderMovieItem = (item) => (
    <List.Item>
      <MovieItem
        swatch={`${POSTER_PREFIX}${item.poster_path}`}
        title={item.title}
        rating={item.vote_average / 2}
      />
    </List.Item>
  );
  return (
    <Body ref={bodyRef}>
      <List
        loading={!movieList.length}
        dataSource={movieList}
        renderItem={renderMovieItem}
        grid={{
          gutter: 10,
          column: getGripColumn(width),
        }}
      />
    </Body>
  );
}

const getGripColumn = (width) => Math.max(Math.floor(width / 200), 1);
