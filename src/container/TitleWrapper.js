import React from 'react';

import {
  HorizontalFlexWrapper,
  VerticalFlexWrapper,
  BoldWrapper,
  Gap,
} from './styledComponent';

const verticalAlign = 'vertical';

export default function({ title, children, align = verticalAlign }) {
  const Wrapper =
    align === verticalAlign ? VerticalFlexWrapper : HorizontalFlexWrapper;
  return (
    <Wrapper>
      {title && <BoldWrapper>{title}</BoldWrapper>}
      {title && align !== verticalAlign && <Gap />}
      {children}
    </Wrapper>
  );
}
