import React from 'react';

import { Rate } from 'antd';

import {
  MovieItemWrapper,
  MovieItemSwatch,
  MovieItemTitle,
} from '../container/styledComponent';

export default function MovieItem({ swatch, title, rating }) {
  return (
    <MovieItemWrapper>
      <MovieItemSwatch src={swatch} />
      <MovieItemTitle>{title}</MovieItemTitle>
      <Rate allowHalf disabled defaultValue={rating} />
    </MovieItemWrapper>
  );
}
