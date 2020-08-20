import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { CheckboxGroup } from '../../component';

const options = ['a', 'b', 'c'];
const checked = { b: true, c: true };

describe('Test Switch Component', () => {
  let testRenderer;
  let instance;
  const mockOnChange = jest.fn((check) => {});
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

  it('matches snapshot', () => {
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('test user interactive', () => {
  const mockOnChange = jest.fn();
  beforeEach(() => {
    cleanup();
    mockOnChange.mockClear();
  });

  it('test user click on checkbox', () => {
    const { getByTestId } = render(
      <CheckboxGroup
        options={options}
        checked={checked}
        onOptionClick={mockOnChange}
      />
    );
    options.forEach((option, idx) => {
      fireEvent.click(getByTestId(`checkBox-${idx}`));
      expect(mockOnChange).toHaveBeenCalledTimes(idx + 1);
      expect(mockOnChange).toBeCalledWith(option, checked[option]);
    });
  });
});
