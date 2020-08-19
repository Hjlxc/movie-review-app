import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  movieDataSlice,
  fetchMovieData,
  initialState,
} from '../modules/movieData';
import { fetchMovieFromDB } from '../modules/movieData/utils';
import { MOVIE_DB_ENDPOINT, MOVIE_DB_API_KEY } from '../constants';
const { reducer } = movieDataSlice;
const {
  setMovieData: setMovieDataAction,
  setLoading: setLoadingAction,
} = movieDataSlice.actions;

const mockStore = configureMockStore([thunk]);

const testDataPage_1 = {
  page: 1,
  totalPage: 2,
  results: [
    { title: 'test_title_1', overview: 'test_overview_1' },
    { title: 'test_title_2', overview: 'test_overview_2' },
  ],
};

const testDataPage_2 = {
  page: 2,
  totalPage: 2,
  results: [
    { title: 'test_title_3', overview: 'test_overview_3' },
    { title: 'test_title_4', overview: 'test_overview_4' },
  ],
};

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
    store = mockStore({ movieData: initialState, loading: true });
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
