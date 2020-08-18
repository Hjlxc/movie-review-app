import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectMovieVoting,
  setMovieFilterVoting,
} from '../modules/movieFilter';
import VotingFilter from '../component/VotingFilter';

export default function MovieFilter() {
  const dispatch = useDispatch();
  const voting = useSelector(selectMovieVoting);

  const onVotingFilterChange = ([min, max]) =>
    dispatch(setMovieFilterVoting({ min, max }));
  return (
    <div>
      <VotingFilter {...voting} onChange={onVotingFilterChange} />
    </div>
  );
}
