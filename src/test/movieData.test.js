import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  movieDataSlice,
  fetchMovieData,
  initialState,
  selectMovieData,
  selectFirstUnfetchedPage,
  selectHasMoreData,
  selectLoadingMovieData,
} from '../modules/movieData';
import { fetchMovieFromDB, flat } from '../modules/movieData/utils';
import { MOVIE_DB_ENDPOINT, MOVIE_DB_API_KEY } from '../constants';

const { reducer } = movieDataSlice;
const {
  setMovieData: setMovieDataAction,
  setLoading: setLoadingAction,
} = movieDataSlice.actions;

const mockStore = configureMockStore([thunk]);

export const testDataPage_1 = {
  page: 1,
  total_pages: 2,
  results: [
    {
      popularity: 271.572,
      vote_count: 430,
      video: false,
      poster_path: '/bOKjzWDxiDkgEQznhzP4kdeAHNI.jpg',
      id: 605116,
      adult: false,
      backdrop_path: '/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg',
      original_language: 'en',
      original_title: 'The Project Power',
      genre_ids: [28, 80, 878],
      title: 'The Project Power',
      vote_average: 2,
      overview:
        'An ex-soldier, a teen and a cop collide in New Orleans as they hunt for the source behind a dangerous new pill that grants users temporary superpowers.',
      release_date: '2020-08-14',
    },
    {
      popularity: 128.317,
      vote_count: 86,
      video: false,
      poster_path: '/vFIHbiy55smzi50RmF8LQjmpGcx.jpg',
      id: 703771,
      adult: true,
      backdrop_path: '/owraiceOKtSOa3t8sp3wA9K2Ox6.jpg',
      original_language: 'ru',
      original_title: 'Deathstroke: Knights & Dragons - The Movie',
      genre_ids: [28, 16],
      title: 'Deathstroke: Knights & Dragons - The Movie',
      vote_average: 4,
      overview:
        "Ten years ago, Slade Wilson-aka the super-assassin called Deathstroke-made a tragic mistake and his wife and son paid a terrible price. Now, a decade later, Wilson's family is threatened once again by the murderous Jackal and the terrorists of H.IV.E. Can Deathstroke atone for the sins of the past-or will his family pay the ultimate price?",
      release_date: '2020-08-04',
    },
  ],
};

export const testDataPage_2 = {
  page: 2,
  total_pages: 2,
  results: [
    {
      popularity: 106.734,
      vote_count: 16,
      video: false,
      poster_path: '/5oQJ6HeNGWnEtP9Qyt5IZjuKI7j.jpg',
      id: 726664,
      adult: false,
      backdrop_path: '/s7NC2kntiPB3WltWj9bnNTkoqUp.jpg',
      original_language: 'en',
      original_title: 'Fearless',
      genre_ids: [16, 35],
      title: 'Fearless',
      vote_average: 6,
      overview:
        'A teen gamer is forced to level up to full-time babysitter when his favorite video game drops three superpowered infants from space into his backyard.',
      release_date: '2020-08-14',
    },
    {
      popularity: 83.948,
      vote_count: 405,
      video: false,
      poster_path: '/b5XfICAvUe8beWExBz97i0Qw4Qh.jpg',
      id: 612706,
      adult: true,
      backdrop_path: '/ishzDCZIv9iWfI70nv5E4ZreYUD.jpg',
      original_language: 'fr',
      original_title: 'Work It',
      genre_ids: [35, 10402],
      title: 'Work It',
      vote_average: 8,
      overview:
        "A brilliant but clumsy high school senior vows to get into her late father's alma mater by transforming herself and a misfit squad into dance champions.",
      release_date: '2020-08-07',
    },
  ],
};

test('Test flat helper function', () => {
  // no nest
  expect(flat(['a', 'b', 1])).toEqual(['a', 'b', 1]);
  // one level single nest
  expect(flat(['a', ['b', 2], 1])).toEqual(['a', 'b', 2, 1]);
  // one level with multi nest
  expect(flat([['a', { key: 1 }], 'b', ['c', 2]])).toEqual([
    'a',
    { key: 1 },
    'b',
    'c',
    2,
  ]);
  // multi level with multi nest
  expect(flat([['a', ['b', ['c', 3], 2], 1], ['d', 4]])).toEqual([
    'a',
    'b',
    'c',
    3,
    2,
    1,
    'd',
    4,
  ]);
});

describe('Test movieData Actions', () => {
  it('Test setLoadingAction Action', () => {
    const expectTrueAction = {
      type: 'movieData/setLoading',
      payload: true,
    };
    const expectFalseAction = {
      type: 'movieData/setLoading',
      payload: false,
    };
    expect(setLoadingAction(true)).toEqual(expectTrueAction);
    expect(setLoadingAction(false)).toEqual(expectFalseAction);
  });

  it('Test setMovieDataAction Action', () => {
    const payload = ['a', 'b', 'c'];
    const expectAction = { type: 'movieData/setMovieData', payload };
    expect(setMovieDataAction(payload)).toEqual(expectAction);
  });

  describe('Test fetchMovieData Action', () => {
    beforeEach(() => fetch.resetMocks());

    it('Test fetchMovieFromDB without option', async () => {
      fetch.mockResponseOnce(JSON.stringify(testDataPage_1));
      const fetchedData = await fetchMovieFromDB();
      expect(fetchedData).toEqual(testDataPage_1);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${MOVIE_DB_ENDPOINT}?api_key=${MOVIE_DB_API_KEY}`
      );
    });

    it('Test fetchMovieFromDB with valid option', async () => {
      fetch.mockResponseOnce(JSON.stringify(testDataPage_1));
      await fetchMovieFromDB({ page: 2 });
      expect(fetch).toHaveBeenCalledWith(
        `${MOVIE_DB_ENDPOINT}?api_key=${MOVIE_DB_API_KEY}&page=2`
      );
    });

    it('Test fetchMovieData invalid input', async () => {
      expect(async () => {
        await fetchMovieFromDB({ page: 'a' }).rejects.toThrow();
        await fetchMovieFromDB({ page: 1.1 }).rejects.toThrow();
        await fetchMovieFromDB({ page: 0 }).rejects.toThrow();
        await fetchMovieFromDB({ page: [1, 'a'] }).rejects.toThrow();
      });
    });

    it('Test fetchMovieData return the correct action', async () => {
      fetch.mockResponseOnce(JSON.stringify(testDataPage_1));
      const store = mockStore({ movieData: initialState });
      const expectAction = {
        type: 'movieData/setMovieData',
        payload: [testDataPage_1],
      };
      await expect(store.dispatch(fetchMovieData())).resolves.toEqual(
        expectAction
      );
    });

    it('Test fetchMovieData with multiply pages return the correct action', async () => {
      fetch.mockResponses(
        JSON.stringify(testDataPage_1),
        JSON.stringify(testDataPage_2)
      );
      const store = mockStore({ movieData: initialState });
      const expectAction = {
        type: 'movieData/setMovieData',
        payload: [testDataPage_1, testDataPage_2],
      };
      await expect(
        store.dispatch(fetchMovieData({ page: [1, 2] }))
      ).resolves.toEqual(expectAction);
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(
        `${MOVIE_DB_ENDPOINT}?api_key=${MOVIE_DB_API_KEY}&page=1`
      );
      expect(fetch).toHaveBeenCalledWith(
        `${MOVIE_DB_ENDPOINT}?api_key=${MOVIE_DB_API_KEY}&page=2`
      );
    });
  });
});

describe('Test movieData Reducers', () => {
  it('Test setLoading Reducer', () => {
    const store = mockStore({ movieData: initialState }); // initial state has loading as false

    // after calling reducer with setLoadingAction to false, the new state should have loading equal to false
    expect(reducer(store.getState().movieData, setLoadingAction(true))).toEqual(
      {
        ...initialState,
        loading: true,
      }
    );
  });
  describe('Test setMovieData Reducer', () => {
    let store;
    beforeEach(() => {
      fetch.resetMocks();
      // override loading to true from initial state
      // test that after called setMovieData reducer, it will also set loading to false
      store = mockStore({ movieData: { ...initialState, loading: true } });
    });

    it('Test new state with setMovieData reducer', async () => {
      fetch.mockResponseOnce(JSON.stringify(testDataPage_1));
      expect(
        reducer(
          store.getState().movieData,
          await store.dispatch(fetchMovieData())
        )
      ).toEqual({ data: [testDataPage_1], loading: false });
    });

    it('Test new state with setMovieData reducer with page 2', async () => {
      fetch.mockResponseOnce(JSON.stringify(testDataPage_2));
      expect(
        reducer(
          store.getState().movieData,
          await store.dispatch(fetchMovieData())
        )
      ).toEqual({ data: [undefined, testDataPage_2], loading: false });
    });

    it('Test new state with setMovieData reducer with multiply pages', async () => {
      fetch.mockResponses(
        JSON.stringify(testDataPage_1),
        JSON.stringify(testDataPage_2)
      );
      expect(
        reducer(
          store.getState().movieData,
          await store.dispatch(fetchMovieData({ page: [1, 2] }))
        )
      ).toEqual({ data: [testDataPage_1, testDataPage_2], loading: false });
    });
  });
});

describe('Test movieData Selectors', () => {
  describe('Test selectMovieData Selector', () => {
    it('Should return empty array as no data available', () => {
      const store = mockStore({ movieData: initialState });
      expect(selectMovieData(store.getState())).toEqual([]);
    });
    it('Should return the results of page 1 data', () => {
      const store = mockStore({
        movieData: { ...initialState, data: [testDataPage_1] },
      });
      expect(selectMovieData(store.getState())).toEqual(testDataPage_1.results);
    });
    it('Should return the results of page 1 data', () => {
      const store = mockStore({
        movieData: { ...initialState, data: [undefined, testDataPage_2] },
      });
      expect(selectMovieData(store.getState())).toEqual(testDataPage_2.results);
    });
    it('Should return the result cancat page 1 data and page 2 data', () => {
      const store = mockStore({
        movieData: { ...initialState, data: [testDataPage_1, testDataPage_2] },
      });
      expect(selectMovieData(store.getState())).toEqual(
        testDataPage_1.results.concat(testDataPage_2.results)
      );
    });
  });

  describe('Test selectFirstUnfetchedPage Selector', () => {
    it('Should return 1 as no data exist', () => {
      const store = mockStore({ movieData: initialState });
      expect(selectFirstUnfetchedPage(store.getState())).toBe(1);
    });
    it('Should return 2 as first data are fetched', () => {
      const store = mockStore({
        movieData: { ...initialState, data: [testDataPage_1] },
      });
      expect(selectFirstUnfetchedPage(store.getState())).toBe(2);
    });
    it('Should return 1 as forst data is not fetch even second page has fetched', () => {
      const store = mockStore({
        movieData: { ...initialState, data: [undefined, testDataPage_2] },
      });
      expect(selectFirstUnfetchedPage(store.getState())).toBe(1);
    });
    it('Should return 3 as all the data has being fetched', () => {
      const store = mockStore({
        movieData: { ...initialState, data: [testDataPage_1, testDataPage_2] },
      });
      expect(selectFirstUnfetchedPage(store.getState())).toBe(3);
    });
  });

  describe('Test selectHasMoreData Selector', () => {
    it('Should return true as no data exist', () => {
      const store = mockStore({ movieData: initialState });
      expect(selectHasMoreData(store.getState())).toBeTruthy();
    });
    it('Should return true as not all data are fetched', () => {
      const store = mockStore({
        movieData: { ...initialState, data: [testDataPage_1] },
      });
      expect(selectHasMoreData(store.getState())).toBeTruthy();
    });
    it('Should return false as all the data are fetched', () => {
      const store = mockStore({
        movieData: { ...initialState, data: [testDataPage_1, testDataPage_2] },
      });
      expect(selectHasMoreData(store.getState())).toBeFalsy();
    });
  });

  it('Test selectLoadingMovieData Selector', () => {
    const store = mockStore({
      movieData: { data: [testDataPage_1, testDataPage_2], loading: true },
    });
    expect(selectLoadingMovieData(store.getState())).toBeTruthy();
  });
});
