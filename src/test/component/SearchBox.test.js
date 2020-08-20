import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { SearchBox } from '../../component';

test('matches snapshot', () => {
  const testRenderer = renderer.create(<SearchBox placeholder={'search'} />);
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('test user interactive', () => {
  const mockOnChange = jest.fn();
  beforeEach(() => {
    cleanup();
    mockOnChange.mockClear();
  });

  it('test user input search string', () => {
    const { getByPlaceholderText } = render(
      <SearchBox placeholder={'search'} />
    );
    const input = getByPlaceholderText('search');
    expect(input).not.toBeNull();
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input.value).toBe('abc');
  });
});
