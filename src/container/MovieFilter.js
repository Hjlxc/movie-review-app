import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'antd';

import { VerticalFlexWrapper } from './styledComponent';
import {
  setMovieFilterVoting,
  setMovieFilterLanguage,
  setMovieFilterAdult,
  setMovieFilterSearch,
  setMovieSort,
  selectMovieVoting,
  selectLanguageOption,
  selectMovieLanguage,
  selectMovieAdult,
  selectMovieSort,
  sortOptions,
} from '../modules/movieFilter';
import {
  CheckboxGroup as LanguageFilter,
  Slider as VotingFilter,
  Switch as AdultFilter,
  SearchBox as SearchFilter,
  Dropdown as SortDropdown,
} from '../component';
import TitleWrapper from './TitleWrapper';

const sortDropdownOptions = Object.keys(sortOptions);

export default function MovieFilter() {
  const dispatch = useDispatch();

  // read filter data from redux store
  const voting = useSelector(selectMovieVoting);
  const languageOptions = useSelector(selectLanguageOption);
  const language = useSelector(selectMovieLanguage);
  const adult = useSelector(selectMovieAdult);
  const sort = useSelector(selectMovieSort);

  // update redux store when search compoennt updates
  const onVotingFilterChange = ([min, max]) =>
    dispatch(setMovieFilterVoting({ min, max }));

  const onLanguageFilterChange = (option) =>
    dispatch(setMovieFilterLanguage(option));

  const onAdultFilterChange = (check) => dispatch(setMovieFilterAdult(check));

  const onSearchFilterChange = (search) => {
    dispatch(setMovieFilterSearch(search));
  };

  const onSortFilterChange = (value) => {
    dispatch(setMovieSort(value.key === 'item_0' ? '' : value.key));
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
      <Divider />
      <TitleWrapper title="Sort By:" align="horizontal">
        <SortDropdown
          select={sort}
          options={sortDropdownOptions}
          onChange={onSortFilterChange}
        />
      </TitleWrapper>
    </VerticalFlexWrapper>
  );
}
