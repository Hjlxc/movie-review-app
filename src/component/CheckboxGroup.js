import React from 'react';
import { Checkbox } from 'antd';

import { VerticalFlexWrapper } from '../container/styledComponent';

export default function({ options, checked, onOptionClick }) {
  return (
    <VerticalFlexWrapper>
      {options.map((option, idx) => (
        <div key={option}>
          <Checkbox
            data-testid={`checkBox-${idx}`}
            onChange={() => onOptionClick(option, checked[option])}
            checked={checked[option]}
          >
            {option}
          </Checkbox>
        </div>
      ))}
    </VerticalFlexWrapper>
  );
}
