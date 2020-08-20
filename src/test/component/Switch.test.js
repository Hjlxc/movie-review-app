import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { Switch } from '../../component';

test('matches snapshot', () => {
  const testRenderer = renderer.create(<Switch checked={true} />);
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('test user interactive', () => {
  const mockOnChange = jest.fn();
  beforeEach(() => {
    cleanup();
    mockOnChange.mockClear();
  });

  it('test user click on checked component', () => {
    const { getByTestId } = render(
      <Switch checked={true} onChange={mockOnChange} />
    );
    fireEvent.click(getByTestId('switch'));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toBeCalledWith(false, expect.anything());
  });

  it('test user click on un-checked component', () => {
    const { getByTestId } = render(
      <Switch checked={false} onChange={mockOnChange} />
    );
    fireEvent.click(getByTestId('switch'));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toBeCalledWith(true, expect.anything());
  });
});
