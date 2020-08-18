import React from 'react';

import { Rate } from 'antd';

import {
  MovieItemWrapper,
  MovieItemSwatch,
  BoldWrapper,
} from '../container/styledComponent';

export default function MovieItem({ swatch, title, rating, onClick }) {
  return (
    <MovieItemWrapper>
      <MovieItemSwatch src={swatch} onClick={onClick} />
      <BoldWrapper>{title}</BoldWrapper>
      <Rate allowHalf disabled defaultValue={rating} />
    </MovieItemWrapper>
  );
}
