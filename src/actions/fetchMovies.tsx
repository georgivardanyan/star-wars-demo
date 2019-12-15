import fetchMovies from '../fetchers/fetchMovies';
import {
  FETCH_MOVIES_STARTED,
  FETCH_MOVIES_FAILED,
  FETCH_MOVIES_FINISHED
} from '../reducer';

export default async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_MOVIES_STARTED });

    const movies = await fetchMovies();

    dispatch({ type: FETCH_MOVIES_FINISHED, movies });

  } catch (error) {
    dispatch({ type: FETCH_MOVIES_FAILED });
  }
};
