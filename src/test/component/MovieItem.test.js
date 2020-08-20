import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { MovieItem } from '../../component';

test('matches snapshot 1', () => {
  const testRenderer = renderer.create(
    <MovieItem swatch="" title="title" rating={3} />
  );
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('test initial render', () => {
  const mockOnClick = jest.fn();
  beforeEach(() => {
    cleanup();
    mockOnClick.mockClear();
  });

  it('test render the correct component', () => {
    const { getByText, getByAltText } = render(
      <MovieItem swatch="" title="title" rating={3} onClick={mockOnClick} />
    );
    expect(getByText('title')).not.toBeNull();
    expect(getByAltText('title Poster')).not.toBeNull();

    fireEvent.click(getByAltText('title Poster'));
    expect(mockOnClick).toBeCalledTimes(1);
  });
});
