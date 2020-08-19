import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  movieDataSlice,
  fetchMovieData,
  initialState,
} from '../modules/movieData';
import { fetchMovieFromDB } from '../modules/movieData/utils';
import { MOVIE_DB_ENDPOINT, MOVIE_DB_API_KEY } from '../constants';

const {
  setMovieData: setMovieDataAction,
  setLoading: setLoadingAction,
} = movieDataSlice.actions;

const mockStore = configureMockStore([thunk]);

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
  const response = [
    { title: 'test_title_1', overview: 'test_overview_1' },
    { title: 'test_title_2', overview: 'test_overview_2' },
  ];

  beforeEach(() => fetch.resetMocks());

  it('Test fetchMovieFromDB without option', async () => {
    fetch.mockResponseOnce(JSON.stringify(response));
    const fetchedData = await fetchMovieFromDB();
    expect(fetchedData).toEqual(response);
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
    fetch.mockResponseOnce(JSON.stringify(response));
    await fetchMovieFromDB({ page: 2 });
    expect(fetch).toHaveBeenCalledWith(
      `${MOVIE_DB_ENDPOINT}?api_key=${MOVIE_DB_API_KEY}&page=2`
    );
  });

  it('Test fetchMovieData return the correct action', async () => {
    fetch.mockResponseOnce(JSON.stringify(response));
    const store = mockStore({ movieData: initialState });
    const expectAction = {
      type: 'movieData/setMovieData',
      payload: response,
    };
    await expect(store.dispatch(fetchMovieData())).resolves.toEqual(
      expectAction
    );
  });
});
