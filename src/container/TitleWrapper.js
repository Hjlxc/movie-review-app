import React from 'react';

import { VerticalFlexWrapper, BoldWrapper } from './styledComponent';

export default function(props) {
  return (
    <VerticalFlexWrapper>
      {props.title && <BoldWrapper>{props.title}</BoldWrapper>}
      {props.children}
    </VerticalFlexWrapper>
  );
}
