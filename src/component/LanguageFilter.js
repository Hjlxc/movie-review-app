import React from 'react';
import { Checkbox } from 'antd';

import { VerticalFlexWrapper, BoldWrapper } from '../container/styledComponent';

export default function({ options, checked, onOptionClick }) {
  return (
    <VerticalFlexWrapper>
      <BoldWrapper>Language</BoldWrapper>
      {options.map((option) => (
        <div key={option}>
          <Checkbox
            onChange={() => onOptionClick(option)}
            checked={checked[option]}
          >
            {option}
          </Checkbox>
        </div>
      ))}
    </VerticalFlexWrapper>
  );
}
