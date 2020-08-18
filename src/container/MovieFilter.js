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
import {
  CheckboxGroup as LanguageFilter,
  Slider as VotingFilter,
} from '../component';
import TitleWrapper from './TitleWrapper';

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
      <TitleWrapper title="Voting">
        <VotingFilter {...voting} onChange={onVotingFilterChange} />
      </TitleWrapper>
      <TitleWrapper title="Language">
        <LanguageFilter
          options={languageOptions}
          checked={language}
          onOptionClick={onLanguageFilterChange}
        />
      </TitleWrapper>
    </VerticalFlexWrapper>
  );
}
