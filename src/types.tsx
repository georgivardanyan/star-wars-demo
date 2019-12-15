export type ReducerState = {
  movies: ReducerMovieShape
  characters: ReducerCharacterShape
};

export type ReducerAction = {
  type: string
  currentEpisode?: number | null | undefined
  fromCache?: boolean
  movieCharacters?: MovieCharacters
  movies?: Array<Movie>
};

export type ReducerMovieShape = {
  loading: boolean,
  error: boolean,
  items: Array<Movie>,
};

export type ReducerCharacterShape = {
  loading: boolean
  error: boolean
  byEpisode: {
    [x: string]: MovieCharacters
  }
  currentEpisode: number | null | undefined
};

export type Movie = {
  characters: string[]
  title: string
  opening_crawl: string
  episode_id: number
};

export type MovieCharacters = {
  items: Array<Character>
  charactersTotalHeight: HeightByUnits
  totalCharacters: number
};

export type Character = {
  name: string
  gender: string
  height: string
}

export type HeightByUnits = {
  cm: number
  ft: string
  inch: string
};
