import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { Dropdown } from '../../component';
const options = ['a', 'b'];

test('matches snapshot 1', () => {
  const testRenderer = renderer.create(<Dropdown options={options} />);
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

test('matches snapshot 2', () => {
  const testRenderer = renderer.create(
    <Dropdown options={options} select="a" />
  );
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('test initial render', () => {
  beforeEach(cleanup);

  it('test render with select', () => {
    const { getByText } = render(<Dropdown options={options} select={'a'} />);
    expect(getByText('a')).not.toBeNull();
  });
});
