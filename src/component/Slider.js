import React from 'react';
import { Slider } from 'antd';

export default function({ min, max, selectMin, selectMax, onChange }) {
  const marks = { [min]: min, [max]: max };
  return (
    <Slider
      min={min}
      max={max}
      range
      defaultValue={[selectMin, selectMax]}
      step={0.1}
      onChange={onChange}
      marks={marks}
    />
  );
}
