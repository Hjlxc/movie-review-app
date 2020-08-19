import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import {
  Body,
  HorizontalFlexWrapper,
  CenteredWrapper,
} from './styledComponent';
import {
  fetchMovieData,
  selectHasMoreData,
  selectFirstUnfetchedPage,
  selectLoadingMovieData,
} from '../modules/movieData';
import { selectFilteredMovie } from '../modules/movieFilter';
import { MovieItem, MovieModal } from '../component';
import { POSTER_PREFIX } from '../constants';

export default function MovieList() {
  const bodyRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [modalItem, setModalItem] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // get movieList from redux store
  const movieList = useSelector(selectFilteredMovie);
  const hasMoreData = useSelector(selectHasMoreData);
  const nextFetchPage = useSelector(selectFirstUnfetchedPage);
  const loading = useSelector(selectLoadingMovieData);
  const dispatch = useDispatch();

  // window resize handler
  const handleResize = () => {
    if (!bodyRef.current) return;
    setWidth(bodyRef.current.offsetWidth);
  };

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

  useEffect(
    () => {
      setHasMore(hasMoreData);
    },
    [movieList]
  );

  const renderMovieItem = (item) => (
    <List.Item>
      <MovieItem
        {...parseItemData(item)}
        onClick={() => {
          setModalItem(item);
        }}
      />
    </List.Item>
  );

  const handleInfiniteOnLoad = () =>
    dispatch(fetchMovieData({ page: nextFetchPage }));

  // add key={0} to fix the warning message about unique key
  // https://github.com/oVirt/ovirt-web-ui/issues/562
  const loader = (
    <CenteredWrapper key={0}>
      <HorizontalFlexWrapper>
        <Spin style={{ marginRight: '20px' }} />
        {'loading'}
      </HorizontalFlexWrapper>
    </CenteredWrapper>
  );

  return (
    <Body ref={bodyRef}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        useWindow={false}
        hasMore={hasMore}
        loader={loading && loader}
      >
        {movieList.length ? (
          <List
            dataSource={movieList}
            renderItem={renderMovieItem}
            grid={{
              gutter: 10,
              column: getGripColumn(width),
            }}
          />
        ) : (
          <div />
        )}
      </InfiniteScroll>
      <MovieModal
        visible={!!modalItem}
        {...parseItemData(modalItem || {})}
        onClose={() => setModalItem(null)}
      />
    </Body>
  );
}
// get gripColumn based on current window width, min item width is 200
const getGripColumn = (width) => Math.max(Math.floor(width / 200), 1);

// parse the item data to include swatch url and rating based on 5
const parseItemData = (item) => ({
  ...item,
  rating: item.vote_average / 2,
  swatch: `${POSTER_PREFIX}${item.poster_path}`,
});
