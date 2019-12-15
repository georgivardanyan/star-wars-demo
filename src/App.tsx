import React, { useReducer, useEffect } from 'react';
import Layout from './components/layout';
import MovieDropDown from './components/movie-dropdown';
import MovieDetails from './components/movie-details';
import {
  initialState,
  reducer,
} from './reducer';
import fetchMovieCharacters from './actions/fetchMovieCharacters';
import fetchMovies from './actions/fetchMovies';
import starWarsImage from './media/star-wars.jpg';
import { OptionTypeBase } from 'react-select';
import { Movie } from './types';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Fetch movies on mount
  useEffect(() => {
    fetchMovies(dispatch);
  }, [dispatch]);

  // Dropdown content
  const dropdown = (
    <MovieDropDown
      isLoading={state.movies.loading}
      error={state.movies.error}
      options={state.movies.items.map((movie: Movie) => {
        return {
          label: movie.title,
          value: movie.episode_id
        };
      })}
      onChange={(option: OptionTypeBase): any => {
        const currentEpisode = option.value;
        const inCache = typeof state.characters.byEpisode[currentEpisode] !== 'undefined';
        const movie = state
                        .movies
                        .items
                        .find((movie: Movie) => movie.episode_id === currentEpisode);

        if (typeof movie !== 'undefined') {
          fetchMovieCharacters(dispatch, option.value, inCache, movie.characters);
        }
      }}
    />
  );

  return (
    <Layout sidebarContent={dropdown}>
      <MovieDetails
        starWarsImage={starWarsImage}
        characters={state.characters}
        movies={state.movies}
      />
    </Layout>
  );
}

export default App;
