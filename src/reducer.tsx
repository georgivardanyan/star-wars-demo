import { ReducerState, ReducerAction } from './types';

// Action types
export const FETCH_MOVIES_STARTED: string = 'FETCH_MOVIES_STARTED';
export const FETCH_MOVIES_FAILED: string = 'FETCH_MOVIES_FAILED';
export const FETCH_MOVIES_FINISHED: string = 'FETCH_MOVIES_FINISHED';
export const FETCH_CHARACTERS_STARTED: string = 'FETCH_CHARACTERS_STARTED';
export const FETCH_CHARACTERS_FAILED: string = 'FETCH_CHARACTERS_FAILED';
export const FETCH_CHARACTERS_FINISHED: string = 'FETCH_CHARACTERS_FINISHED';

// Initial state
export const initialState: ReducerState = {
  movies: {
    loading: false,
    error: false,
    items: [],
  },
  characters: {
    loading: false,
    error: false,
    byEpisode: {},
    currentEpisode: null
  }
};

// Reducer function
export function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case FETCH_MOVIES_STARTED:
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: true
        }
      };
    case FETCH_MOVIES_FAILED:
      return {
        ...state,
        movies: {
          ...state.movies,
          loading: false,
          error: true,
        }
      };
    case FETCH_MOVIES_FINISHED:
      return {
        ...state,
        movies: {
          ...state.movies,
          items: action.movies || [],
          loading: false,
        }
      };
    case FETCH_CHARACTERS_STARTED:
      return {
        ...state,
        characters: {
          ...state.characters,
          loading: true,
          error: false,
        }
      };
    case FETCH_CHARACTERS_FAILED:
      return {
        ...state,
        characters: {
          ...state.characters,
          loading: false,
          error: true,
        }
      };
    case FETCH_CHARACTERS_FINISHED: {
      const { currentEpisode, fromCache, movieCharacters } = action;

      const newState: ReducerState = {
        ...state,
        characters: {
          ...state.characters,
          loading: false,
          error: false,
          currentEpisode,
        }
      };

      // Update character cache
      if (!fromCache && typeof movieCharacters !== 'undefined' ) {
        newState.characters = {
          ...newState.characters,
          byEpisode: {
            ...newState.characters.byEpisode,
            [`${currentEpisode}`]: movieCharacters
          }
        };
      }

      return newState;
    };
    default:
      return state;
  }
}
