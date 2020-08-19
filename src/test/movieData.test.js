import { setMovieData, setLoading } from '../modules/movieData';

test('Test setLoading Action', () => {
  const expectTrueAction = {
    type: 'movieData/setLoading',
    payload: true,
  };
  const expectFalseAction = {
    type: 'movieData/setLoading',
    payload: false,
  };
  expect(setLoading(true)).toEqual(expectTrueAction);
  expect(setLoading(false)).toEqual(expectFalseAction);
});
