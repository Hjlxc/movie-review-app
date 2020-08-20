import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import MovieList, {
  getGridColumn,
  parseItemData,
} from '../../container/MovieList';
import store from '../../app/store';
import { testDataPage_1 } from '../modules/movieData.test';
import { POSTER_PREFIX } from '../../constants';

it('matches snapshot', () => {
  const testRenderer = renderer.create(
    <Provider store={store}>
      <MovieList />
    </Provider>
  );
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

test('test getGridColumn', () => {
  expect(getGridColumn(199)).toBe(1);
  expect(getGridColumn(399)).toBe(1);
  expect(getGridColumn(400)).toBe(2);
});

test('test parseItemData', () => {
  const item = testDataPage_1.results[0];
  expect(parseItemData(testDataPage_1.results[0]).rating).toBe(
    item.vote_average / 2
  );
  expect(parseItemData(testDataPage_1.results[0]).swatch).toBe(
    `${POSTER_PREFIX}${item.poster_path}`
  );
});
