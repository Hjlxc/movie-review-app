import React from 'react';
import { Slider } from 'antd';

import { VerticalFlexWrapper, BoldWrapper } from '../container/styledComponent';

export default function({ title, min, max, selectMin, selectMax, onChange }) {
  const marks = { [min]: min, [max]: max };
  return (
    <VerticalFlexWrapper>
      {title && <BoldWrapper>{title}</BoldWrapper>}
      <Slider
        min={min}
        max={max}
        range
        defaultValue={[selectMin, selectMax]}
        step={0.1}
        onChange={onChange}
        marks={marks}
      />
    </VerticalFlexWrapper>
  );
}
