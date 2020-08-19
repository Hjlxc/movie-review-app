import React from 'react';
import renderer from 'react-test-renderer';

import { Switch } from '../../component';

describe('Test Switch Component', () => {
  let testRenderer;
  let instance;
  const mockOnChange = jest.fn();
  beforeAll(() => {
    testRenderer = renderer.create(
      <Switch checked={true} onChange={mockOnChange} />
    );
    instance = testRenderer.root;
  });

  it('Test switch render with correct props', () => {
    expect(instance.props.checked).toBe(true);
  });

  it('Test onClick function', () => {
    instance.props.onChange();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
