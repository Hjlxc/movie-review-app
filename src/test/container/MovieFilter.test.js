import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';

import MovieFilter from '../../container/MovieFilter';
import store from '../../app/store';

it('matches snapshot', () => {
  const testRenderer = renderer.create(
    <Provider store={store}>
      <MovieFilter />
    </Provider>
  );
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('Test Redux connect', () => {
  let screen;

  beforeAll(() => {
    screen = render(
      <Provider store={store}>
        <MovieFilter />
      </Provider>
    );
  });

  it('Test child component rendered correctly', () => {
    expect(screen.getByPlaceholderText('Search Movie by Title')).not.toBeNull();
    expect(screen.getByText('Language')).not.toBeNull();
    expect(screen.getByText('Adult Only')).not.toBeNull();
    expect(screen.getByText('Sort By:')).not.toBeNull();
    expect(screen.getByText('Voting')).not.toBeNull();
  });
});
