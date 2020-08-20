import React from 'react';
import renderer from 'react-test-renderer';

import { Slider } from '../../component';

describe('Test Switch Component', () => {
  let testRenderer;
  let instance;
  const mockOnChange = jest.fn();
  beforeAll(() => {
    testRenderer = renderer.create(
      <Slider
        min={1}
        max={5}
        selectMin={2}
        selectMax={4}
        onChange={mockOnChange}
      />
    );
    instance = testRenderer.root;
  });

  it('Test switch render with correct props', () => {
    expect(instance.props.min).toBe(1);
    expect(instance.props.max).toBe(5);
    expect(instance.props.selectMin).toBe(2);
    expect(instance.props.selectMax).toBe(4);
  });

  it('Test onChange Function', () => {
    instance.props.onChange();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
