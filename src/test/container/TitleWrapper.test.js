import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';

import TitleWrapper from '../../container/TitleWrapper';

const childComponent = <div>Wrapper Child</div>;

test('matches snapshot vertical', () => {
  const testRenderer = renderer.create(
    <TitleWrapper>{childComponent}</TitleWrapper>
  );
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

test('matches snapshot horizontal', () => {
  const testRenderer = renderer.create(
    <TitleWrapper align="horizontal">{childComponent}</TitleWrapper>
  );
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

test('matches snapshot vertical with title', () => {
  const testRenderer = renderer.create(
    <TitleWrapper title="Wrapper Title">{childComponent}</TitleWrapper>
  );
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

test('matches snapshot horizontal with title', () => {
  const testRenderer = renderer.create(
    <TitleWrapper title="Wrapper Title" align="horizontal">
      {childComponent}
    </TitleWrapper>
  );
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('test correctly render component', () => {
  beforeEach(cleanup);
  it('Should render children', () => {
    const { getByText } = render(<TitleWrapper>{childComponent}</TitleWrapper>);
    expect(getByText('Wrapper Child')).not.toBeNull();
  });
  it('Should render title', () => {
    const { getByText } = render(
      <TitleWrapper title="Wrapper Title">{childComponent}</TitleWrapper>
    );
    expect(getByText('Wrapper Title')).not.toBeNull();
    expect(getByText('Wrapper Child')).not.toBeNull();
  });
});
