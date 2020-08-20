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

const minMovieItemWidth = 200;

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
      const { offsetWidth: width, offsetHeight: height } = bodyRef.current;
      setWidth(width);
      window.addEventListener('resize', handleResize);

      // this is a hacky way to make sure the app fetch enough data when user has a big screen
      // the reason is because InfiniteScroll need scroll event to trigger loading more data
      // if the initial data is not able to cover the full window, then no scroll bar will be rendered
      // thus no scroll event will be fire so the app will not be able to load more data
      const fetchPage = Math.ceil(
        (Math.ceil(width / minMovieItemWidth) *
          Math.ceil(height / minMovieItemWidth / 2)) /
          20
      );

      dispatch(
        fetchMovieData({ page: Array.from(Array(fetchPage), (_, i) => i + 1) })
      );

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
              column: getGridColumn(width),
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
export const getGridColumn = (width) =>
  Math.max(Math.floor(width / minMovieItemWidth), 1);

// parse the item data to include swatch url and rating based on 5
export const parseItemData = (item) => ({
  ...item,
  rating: item.vote_average / 2,
  swatch: `${POSTER_PREFIX}${item.poster_path}`,
});
