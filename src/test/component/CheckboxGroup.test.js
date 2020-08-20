import React from 'react';
import renderer from 'react-test-renderer';

import { CheckboxGroup } from '../../component';

describe('Test Switch Component', () => {
  let testRenderer;
  let instance;
  const mockOnChange = jest.fn((check) => {});
  const options = ['a', 'b', 'c'];
  const checked = { b: true, c: true };
  beforeAll(() => {
    testRenderer = renderer.create(
      <CheckboxGroup
        options={options}
        checked={checked}
        onOptionClick={mockOnChange}
      />
    );
    instance = testRenderer.root;
  });

  it('Test switch render with correct props', () => {
    expect(instance.props.options).toEqual(options);
    expect(instance.props.checked).toEqual(checked);

    // check component render correct checkbox
    const checkBoxInputs = instance.findAllByType('input');
    expect(checkBoxInputs.length).toBe(options.length);

    // check each check box has correct props
    options.forEach((option, idx) => {
      const input = checkBoxInputs[idx];
      expect(input.props.checked).toBe(!!checked[option]);
    });
  });

  it('Test onChange Function', () => {
    instance.props.onOptionClick();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
