import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'antd';

import { VerticalFlexWrapper } from './styledComponent';
import {
  setMovieFilterVoting,
  setMovieFilterLanguage,
  setMovieFilterAdult,
  setMovieFilterSearch,
  selectMovieVoting,
  selectLanguageOption,
  selectMovieLanguage,
  selectMovieAdult,
} from '../modules/movieFilter';
import {
  CheckboxGroup as LanguageFilter,
  Slider as VotingFilter,
  Switch as AdultFilter,
  SearchBox as SearchFilter,
} from '../component';
import TitleWrapper from './TitleWrapper';

export default function MovieFilter() {
  const dispatch = useDispatch();

  // read filter data from redux store
  const voting = useSelector(selectMovieVoting);
  const languageOptions = useSelector(selectLanguageOption);
  const language = useSelector(selectMovieLanguage);
  const adult = useSelector(selectMovieAdult);

  // update redux store when search compoennt updates
  const onVotingFilterChange = ([min, max]) =>
    dispatch(setMovieFilterVoting({ min, max }));

  const onLanguageFilterChange = (option) =>
    dispatch(setMovieFilterLanguage(option));

  const onAdultFilterChange = (check) => dispatch(setMovieFilterAdult(check));

  const onSearchFilterChange = (search) => {
    dispatch(setMovieFilterSearch(search));
  };

  return (
    <VerticalFlexWrapper>
      <SearchFilter
        placeholder="Search Movie by Title"
        onSearch={onSearchFilterChange}
      />
      <Divider />
      <TitleWrapper title="Language">
        <LanguageFilter
          options={languageOptions}
          checked={language}
          onOptionClick={onLanguageFilterChange}
        />
      </TitleWrapper>
      <Divider />
      <TitleWrapper title="Adult Only" align="horizontal">
        <AdultFilter checked={adult} onChange={onAdultFilterChange} />
      </TitleWrapper>
      <Divider />
      <TitleWrapper title="Voting">
        <VotingFilter {...voting} onChange={onVotingFilterChange} />
      </TitleWrapper>
    </VerticalFlexWrapper>
  );
}
