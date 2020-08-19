import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  initialState,
  movieFilterSlice,
  setMovieFilterLanguage,
  setMovieFilterVoting,
  setMovieFilterAdult,
  setMovieFilterSearch,
  setMovieSort,
  selectMovieLanguage,
  selectMovieVoting,
  selectMovieAdult,
  selectMovieSearch,
  selectLanguageOption,
  selectFilteredMovie,
  selectMovieSort,
  getApplyLanguageFilter,
} from '../../modules/movieFilter';
import { initialState as movieDataIS } from '../../modules/movieData';
import { testDataPage_1, testDataPage_2 } from './movieData.test';

const { reducer } = movieFilterSlice;

const mockStore = configureMockStore([thunk]);

describe('Test MovieFilter Actions', () => {
  let store;
  beforeAll(() => {
    store = mockStore();
  });
  it('Test setMovieFilterLanguage action', () => {
    const payload = 'en';
    const expectAction = { type: 'movieFilter/setLanguage', payload };
    expect(store.dispatch(setMovieFilterLanguage(payload))).toEqual(
      expectAction
    );
  });
  it('Test setMovieFilterVoting action', () => {
    const input = { min: 2, max: 4 };
    const output = { selectMin: 2, selectMax: 4 };
    const expectAction = { type: 'movieFilter/setVoting', payload: output };
    expect(store.dispatch(setMovieFilterVoting(input))).toEqual(expectAction);
  });
  it('Test setMovieFilterAdult action', () => {
    const payload = true;
    const expectAction = { type: 'movieFilter/setAdult', payload };
    expect(store.dispatch(setMovieFilterAdult(payload))).toEqual(expectAction);
  });
  it('Test setMovieFilterSearch action', () => {
    const payload = 'search';
    const expectAction = { type: 'movieFilter/setSearch', payload };
    expect(store.dispatch(setMovieFilterSearch(payload))).toEqual(expectAction);
  });
  it('Test setMovieSort action', () => {
    const payload = 'sort';
    const expectAction = { type: 'movieFilter/setSort', payload };
    expect(store.dispatch(setMovieSort(payload))).toEqual(expectAction);
  });
});

describe('Test MovieFilter Reducers', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ movieFilter: initialState });
  });
  it('Test setLanguage reducer', () => {
    // test set language that is not exist
    expect(
      reducer(
        store.getState().movieFilter,
        store.dispatch(setMovieFilterLanguage('en'))
      )
    ).toEqual({ ...initialState, language: { en: true } });

    // initial store with en as exist language
    // and test set language that is already exist
    store = mockStore({
      movieFilter: { ...initialState, language: { en: true } },
    });
    expect(
      reducer(
        store.getState().movieFilter,
        store.dispatch(setMovieFilterLanguage('en'))
      )
    ).toEqual(initialState);
  });

  it('Test setVoting reducer', () => {
    // test both update min and max
    expect(
      reducer(
        store.getState().movieFilter,
        store.dispatch(setMovieFilterVoting({ min: 2, max: 4 }))
      )
    ).toEqual({
      ...initialState,
      voting: { ...initialState.voting, selectMin: 2, selectMax: 4 },
    });

    // test only update min
    expect(
      reducer(
        store.getState().movieFilter,
        store.dispatch(setMovieFilterVoting({ min: 1 }))
      )
    ).toEqual({
      ...initialState,
      voting: { ...initialState.voting, selectMin: 1 },
    });

    // test only update max
    expect(
      reducer(
        store.getState().movieFilter,
        store.dispatch(setMovieFilterVoting({ max: 5 }))
      )
    ).toEqual({
      ...initialState,
      voting: { ...initialState.voting, selectMax: 5 },
    });
  });

  it('Test setAdult reducer', () => {
    expect(
      reducer(
        store.getState().movieFilter,
        store.dispatch(setMovieFilterAdult(true))
      )
    ).toEqual({ ...initialState, adult: true });
  });
  it('Test setSearch reducer', () => {
    expect(
      reducer(
        store.getState().movieFilter,
        store.dispatch(setMovieFilterSearch('abc'))
      )
    ).toEqual({ ...initialState, search: 'abc' });
  });
  it('Test setSort reducer', () => {
    expect(
      reducer(store.getState().movieFilter, store.dispatch(setMovieSort('abc')))
    ).toEqual({ ...initialState, sort: 'abc' });
  });
});

describe('Test MovieFilter Selectors', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ movieData: movieDataIS, movieFilter: initialState });
  });

  it('Test selectMovieLanguage Selector', () => {
    expect(selectMovieLanguage(store.getState())).toEqual(
      initialState.language
    );
  });

  it('Test selectMovieVoting Selector', () => {
    expect(selectMovieVoting(store.getState())).toEqual(initialState.voting);
  });

  it('Test selectMovieAdult Selector', () => {
    expect(selectMovieAdult(store.getState())).toEqual(initialState.adult);
  });

  it('Test selectMovieSearch Selector', () => {
    expect(selectMovieSearch(store.getState())).toEqual(initialState.search);
  });

  it('Test selectMovieSort Selector', () => {
    expect(selectMovieSort(store.getState())).toEqual(initialState.sort);
  });

  describe('Test getApplyLanguageFilter Selector', () => {
    it('Should return false as no language are selected', () => {
      expect(getApplyLanguageFilter(store.getState())).toBeFalsy();
    });
    it('Should return false as no language are selected', () => {
      store = mockStore({
        movieFilter: { ...initialState, language: { en: true } },
      });
      expect(getApplyLanguageFilter(store.getState())).toBeTruthy();
    });
  });

  describe('Test selectLanguageOption Selector', () => {
    it('Should retern only en and ru', () => {
      store = mockStore({
        movieData: { ...movieDataIS, data: [testDataPage_1] },
      });
      expect(selectLanguageOption(store.getState())).toEqual(['en', 'ru']);
    });
    it('Should return en,ru and fr', () => {
      store = mockStore({
        movieData: { ...movieDataIS, data: [testDataPage_1, testDataPage_2] },
      });
      expect(selectLanguageOption(store.getState())).toEqual([
        'en',
        'ru',
        'fr',
      ]);
    });
  });

  describe('Test selectFilteredMovie Selector', () => {
    const movieData = {
      ...movieDataIS,
      data: [testDataPage_1, testDataPage_2],
    };
    // without apply any filter
    it('Should return 4 movies with default filter', () => {
      store = mockStore({ movieData, movieFilter: initialState });
      expect(selectFilteredMovie(store.getState()).length).toBe(4);
    });

    describe('Test language filter', () => {
      // filter movie with en as language
      it('Should return 2 movies with en checked', () => {
        store = mockStore({
          movieData,
          movieFilter: { ...initialState, language: { en: true } },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(2);
      });
      // filter movie with en or fr as language
      it('Should return 3 movies with both en and fr checked', () => {
        store = mockStore({
          movieData,
          movieFilter: { ...initialState, language: { en: true, fr: true } },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(3);
      });
    });
    describe('Test voting filter', () => {
      // test min boundary
      it('Should return 0 movies with min rating set to 8,1', () => {
        store = mockStore({
          movieData,
          movieFilter: {
            ...initialState,
            voting: { ...initialState.voting, selectMin: 8.1 },
          },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(0);
      });
      it('Should return 1 movies with min rating set to 8', () => {
        store = mockStore({
          movieData,
          movieFilter: {
            ...initialState,
            voting: { ...initialState.voting, selectMin: 8 },
          },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(1);
      });

      // test max boundary
      it('Should return 0 movies with max rating set to 1.9', () => {
        store = mockStore({
          movieData,
          movieFilter: {
            ...initialState,
            voting: { ...initialState.voting, selectMax: 1.9 },
          },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(0);
      });
      it('Should return 1 movies with max rating set to 2', () => {
        store = mockStore({
          movieData,
          movieFilter: {
            ...initialState,
            voting: { ...initialState.voting, selectMax: 2 },
          },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(1);
      });

      // test range
      it('Should return 3 movies with min set to 3 and max set to 8', () => {
        store = mockStore({
          movieData,
          movieFilter: {
            ...initialState,
            voting: { ...initialState.voting, selectMin: 3, selectMax: 8 },
          },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(3);
      });
    });
    describe('Test adult filter', () => {
      it('Should return 2 movies that is adult only', () => {
        store = mockStore({
          movieData,
          movieFilter: {
            ...initialState,
            adult: true,
          },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(2);
      });
    });

    describe('Test search filter', () => {
      it('Should return 3 movies with char t in the title', () => {
        store = mockStore({
          movieData,
          movieFilter: {
            ...initialState,
            search: 't',
          },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(3);
      });

      it('Should return 3 movies with char "t" in the title', () => {
        store = mockStore({
          movieData,
          movieFilter: {
            ...initialState,
            search: 't',
          },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(3);
      });

      it('Should return 2 movies with word "the" in the title', () => {
        store = mockStore({
          movieData,
          movieFilter: {
            ...initialState,
            search: 'the',
          },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(2);
      });

      it('Should return one movies match the title "Work It"', () => {
        store = mockStore({
          movieData,
          movieFilter: {
            ...initialState,
            search: 'Work It',
          },
        });
        expect(selectFilteredMovie(store.getState()).length).toBe(1);
      });
    });

    describe('Test sort', () => {
      it('Should not sort as sort state is empty string', () => {
        store = mockStore({
          movieData,
          movieFilter: initialState,
        });
        expect(selectFilteredMovie(store.getState())).toEqual(
          testDataPage_1.results.concat(testDataPage_2.results)
        );
      });
      it('Should not sort as sort state is invalid string', () => {
        store = mockStore({
          movieData,
          movieFilter: { ...initialState, sort: 'abc' },
        });
        expect(selectFilteredMovie(store.getState())).toEqual(
          testDataPage_1.results.concat(testDataPage_2.results)
        );
      });
      it('Should Sort the movie by votiong from height to low', () => {
        store = mockStore({
          movieData,
          movieFilter: { ...initialState, sort: 'Voting: High to Low' },
        });
        expect(selectFilteredMovie(store.getState())).toEqual(
          testDataPage_1.results
            .concat(testDataPage_2.results)
            .sort((a, b) => b.vote_average - a.vote_average)
        );
      });
      it('Should Sort the movie by votiong from low to height', () => {
        store = mockStore({
          movieData,
          movieFilter: { ...initialState, sort: 'Voting: Low to Height' },
        });
        expect(selectFilteredMovie(store.getState())).toEqual(
          testDataPage_1.results
            .concat(testDataPage_2.results)
            .sort((a, b) => a.vote_average - b.vote_average)
        );
      });
      it('Should Sort the movie by title Alphabet with Ascending order', () => {
        store = mockStore({
          movieData,
          movieFilter: { ...initialState, sort: 'Alphabetical: Ascending' },
        });
        expect(selectFilteredMovie(store.getState())).toEqual(
          testDataPage_1.results
            .concat(testDataPage_2.results)
            .sort((a, b) => a.title.localeCompare(b.title))
        );
      });
      it('Should Sort the movie by title Alphabet with Descending order', () => {
        store = mockStore({
          movieData,
          movieFilter: { ...initialState, sort: 'Alphabetical: Descending' },
        });
        expect(selectFilteredMovie(store.getState())).toEqual(
          testDataPage_1.results
            .concat(testDataPage_2.results)
            .sort((a, b) => b.title.localeCompare(a.title))
        );
      });
      it('Should Sort the movie by release date from recent to old', () => {
        store = mockStore({
          movieData,
          movieFilter: { ...initialState, sort: 'Release Date: Recent to Old' },
        });
        expect(selectFilteredMovie(store.getState())).toEqual(
          testDataPage_1.results
            .concat(testDataPage_2.results)
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        );
      });
      it('Should Sort the movie by release date from old to recent', () => {
        store = mockStore({
          movieData,
          movieFilter: { ...initialState, sort: 'Release Date: Old to Recent' },
        });
        expect(selectFilteredMovie(store.getState())).toEqual(
          testDataPage_1.results
            .concat(testDataPage_2.results)
            .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
        );
      });
    });
  });
});
