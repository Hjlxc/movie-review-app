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

const testDataPage_1 = {
  page: 1,
  total_pages: 2,
  results: [
    { title: 'test_title_1', overview: 'test_overview_1' },
    { title: 'test_title_2', overview: 'test_overview_2' },
  ],
};

const testDataPage_2 = {
  page: 2,
  total_pages: 2,
  results: [
    { title: 'test_title_3', overview: 'test_overview_3' },
    { title: 'test_title_4', overview: 'test_overview_4' },
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

test('Test setLoadingAction Action', () => {
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

test('Test setMovieDataAction Action', () => {
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

  it('Test fetchMovieFromDB with invalid option', async () => {
    expect(async () => {
      await fetchMovieFromDB({ page: 'a' }).rejects.toThrow();
      await fetchMovieFromDB({ page: 1.1 }).rejects.toThrow();
      await fetchMovieFromDB({ page: 0 }).rejects.toThrow();
    });
  });

  it('Test fetchMovieFromDB with valid option', async () => {
    fetch.mockResponseOnce(JSON.stringify(testDataPage_1));
    await fetchMovieFromDB({ page: 2 });
    expect(fetch).toHaveBeenCalledWith(
      `${MOVIE_DB_ENDPOINT}?api_key=${MOVIE_DB_API_KEY}&page=2`
    );
  });

  it('Test fetchMovieData return the correct action', async () => {
    fetch.mockResponseOnce(JSON.stringify(testDataPage_1));
    const store = mockStore({ movieData: initialState });
    const expectAction = {
      type: 'movieData/setMovieData',
      payload: testDataPage_1,
    };
    await expect(store.dispatch(fetchMovieData())).resolves.toEqual(
      expectAction
    );
  });
});

test('Test setLoading Reducer', () => {
  const store = mockStore({ movieData: initialState }); // initial state has loading as false

  // after calling reducer with setLoadingAction to false, the new state should have loading equal to false
  expect(reducer(store.getState().movieData, setLoadingAction(true))).toEqual({
    ...initialState,
    loading: true,
  });
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
});

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

test('Test selectLoadingMovieData Selector', () => {
  const store = mockStore({
    movieData: { data: [testDataPage_1, testDataPage_2], loading: true },
  });
  expect(selectLoadingMovieData(store.getState())).toBeTruthy();
});
