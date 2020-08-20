import React from 'react';
import renderer from 'react-test-renderer';

import MovieModal, { getColorGradient } from '../../component/MovieModal';
import { testDataPage_1 } from '../modules/movieData.test';
import { parseItemData } from '../../container/MovieList';

const data = parseItemData(testDataPage_1.results[0]);

test('matches snapshot 1', () => {
  const testRenderer = renderer.create(<MovieModal {...data} />);
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

test('test getColorGradiet', () => {
  expect(getColorGradient(0)).toBe('rgb(255,0,0)');
  expect(getColorGradient(2.5)).toBe('rgb(191.25,63.75,0)');
  expect(getColorGradient(5)).toBe('rgb(127.5,127.5,0)');
  expect(getColorGradient(10)).toBe('rgb(0,255,0)');
});
