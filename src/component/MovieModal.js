import React from 'react';
import { Modal, Progress, Tooltip } from 'antd';

import {
  HorizontalFlexWrapper,
  MovieModalSwatch,
  VerticalFlexWrapper,
  BoldWrapper,
  TextWrapper,
  MovieModalSwatchWrapper,
  Gap,
} from '../container/styledComponent';

export default function MovieModal({
  swatch,
  title,
  vote_average,
  vote_count,
  overview,
  release_date,
  original_language,
  visible,
  onClose,
}) {
  return (
    <Modal
      title={title}
      centered
      visible={visible}
      footer={null}
      onCancel={onClose}
    >
      <HorizontalFlexWrapper>
        <MovieModalSwatchWrapper>
          <MovieModalSwatch src={swatch} />
        </MovieModalSwatchWrapper>
        <VerticalFlexWrapper>
          <HorizontalFlexWrapper>
            <TextWrapper>{release_date}</TextWrapper>
            <Gap />
            <TextWrapper>{`Language: ${original_language}`}</TextWrapper>
          </HorizontalFlexWrapper>
          <div>
            <Tooltip placement="right" title={`${vote_count} Voting`}>
              <Progress
                width={40}
                type="circle"
                percent={vote_average * 10}
                strokeColor={getColorGradient(vote_average)}
              />
            </Tooltip>
          </div>
          <BoldWrapper>Overview</BoldWrapper>
          <TextWrapper>{overview}</TextWrapper>
        </VerticalFlexWrapper>
      </HorizontalFlexWrapper>
    </Modal>
  );
}

// get color gradient based on rating
// 0-5-10 -> red-yellow-green
// reference: http://jsfiddle.net/dPhSg/
const getColorGradient = (rating) => {
  const parts = Math.round(rating > 5 ? 1 - (rating - 5) / 5 : rating / 5);
  let color;
  if (rating < 5) {
    color = [255, parts, 0];
  } else if (rating > 5) {
    color = [parts, 255, 0];
  } else {
    color = [255, 255, 0];
  }

  return `rgb(${color.join(',')})`;
};
