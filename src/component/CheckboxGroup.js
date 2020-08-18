import React from 'react';
import { Checkbox } from 'antd';

import { VerticalFlexWrapper, BoldWrapper } from '../container/styledComponent';

export default function({ title, options, checked, onOptionClick }) {
  return (
    <VerticalFlexWrapper>
      {title && <BoldWrapper>{title}</BoldWrapper>}
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
