import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import MovieList, { getGridColumn } from '../../container/MovieList';
import store from '../../app/store';

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
