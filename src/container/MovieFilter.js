import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { VerticalFlexWrapper } from './styledComponent';

import {
  setMovieFilterVoting,
  setMovieFilterLanguage,
  selectMovieVoting,
  selectLanguageOption,
  selectMovieLanguage,
} from '../modules/movieFilter';
import VotingFilter from '../component/VotingFilter';
import LanguageFilter from '../component/LanguageFilter';

export default function MovieFilter() {
  const dispatch = useDispatch();
  const voting = useSelector(selectMovieVoting);
  const languageOptions = useSelector(selectLanguageOption);
  const language = useSelector(selectMovieLanguage);

  const onVotingFilterChange = ([min, max]) =>
    dispatch(setMovieFilterVoting({ min, max }));

  const onLanguageFilterChange = (option) =>
    dispatch(setMovieFilterLanguage(option));

  return (
    <VerticalFlexWrapper>
      <VotingFilter {...voting} onChange={onVotingFilterChange} />
      <LanguageFilter
        options={languageOptions}
        checked={language}
        onOptionClick={onLanguageFilterChange}
      />
    </VerticalFlexWrapper>
  );
}
