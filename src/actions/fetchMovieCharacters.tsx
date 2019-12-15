import {
  FETCH_CHARACTERS_STARTED,
  FETCH_CHARACTERS_FAILED,
  FETCH_CHARACTERS_FINISHED,
} from '../reducer';
import fetchMovieCharacters from '../fetchers/fetchMovieCharacters';
import { Character, HeightByUnits } from '../types';

function calculateTotalHeight(characters: Array<Character>): HeightByUnits {
  let heightCM: number = 0;

  for (let character of characters) {
    const { height: rawHeight } = character;
    const height = parseInt(rawHeight);

    heightCM += Number.isNaN(height) ? 0 : height;
  }

  return {
    cm: heightCM,
    ft: (heightCM / 30.48).toFixed(2),
    inch: (heightCM / 2.54).toFixed(2)
  };
}

export default async (
  dispatch: any,
  currentEpisode: number,
  inCache: boolean,
  characterUrls: string[]) => {
    
  if (inCache) {
    return dispatch({ type: FETCH_CHARACTERS_FINISHED, currentEpisode, fromCache: true });
  }
  
  try {
    dispatch({ type: FETCH_CHARACTERS_STARTED });

    const characters = await fetchMovieCharacters(characterUrls);
    const charactersTotalHeight = calculateTotalHeight(characters);
    const totalCharacters = characters.length;
    
    dispatch({
      type: FETCH_CHARACTERS_FINISHED,
      currentEpisode,
      movieCharacters: {
        items: characters,
        charactersTotalHeight,
        totalCharacters,
      },
      fromCache: false
    });
    
  } catch (error) {
    dispatch({ type: FETCH_CHARACTERS_FAILED });
  }
};
