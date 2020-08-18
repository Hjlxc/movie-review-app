import React from 'react';
import { Slider } from 'antd';

import { VerticalFlexWrapper, BoldWrapper } from '../container/styledComponent';

export default function({ min, max, selectMin, selectMax, onChange }) {
  return (
    <VerticalFlexWrapper>
      <BoldWrapper>Voting</BoldWrapper>
      <Slider
        min={min}
        max={max}
        range
        defaultValue={[selectMin, selectMax]}
        step={0.1}
        onChange={onChange}
      />
    </VerticalFlexWrapper>
  );
}
