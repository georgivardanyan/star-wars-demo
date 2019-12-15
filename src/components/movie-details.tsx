import React from 'react';
import Loading from './loading';
import ErrorMessage from './error-message';
import CharacterTable from './character-table';
import styles from './css/movie-details.module.css';
import { Row, Col } from 'react-flexbox-grid';
import { ReducerCharacterShape, Movie, ReducerMovieShape } from '../types';

export interface MovieDetailsProps {
  starWarsImage: string,
  characters: ReducerCharacterShape,
  movies: ReducerMovieShape
}

function MovieDetails(props: MovieDetailsProps) {
  const {
    characters: {
      loading,
      error,
      byEpisode,
      currentEpisode,
    },
    movies: {
      items: movies
    },
    starWarsImage
  } = props;

  if (loading) {
    return (
      <Row center="xs" middle="xs">
        <Col>
          <Loading />
        </Col>
      </Row>
    );
  }

  if (error) {
    return (
      <Row center="xs" middle="xs">
        <Col>
          <ErrorMessage />
        </Col>
      </Row>
    );
  }

  if (currentEpisode === null) {
    return (
      <Row center="xs" middle="xs">
        <Col>
          <img
            className={styles.starWarsImage}
            src={starWarsImage}
            alt="Star Wars"
          />
        </Col>
      </Row>
    );
  }

  const characters = byEpisode[`${currentEpisode}`];
  const movie = movies.find((movie: Movie) => movie.episode_id === currentEpisode);

  // To disable dump typescript check
  if (typeof movie === 'undefined') {
    return (
      <Row center="xs" middle="xs">
        <Col>
          <img
            className={styles.starWarsImage}
            src={starWarsImage}
            alt="Star Wars"
          />
        </Col>
      </Row>
    );
  }

  return (
    <div className={styles.root}>
      <p>{movie.title}</p>
      <p>{movie.opening_crawl}</p>
      <CharacterTable
        characters={characters.items}
        charactersTotalHeight={characters.charactersTotalHeight}
        totalCharacters={characters.totalCharacters}
      />
    </div>
  );
}

export default MovieDetails;
