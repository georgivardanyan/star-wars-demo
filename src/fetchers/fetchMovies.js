import proxy from './proxy';

export default async () => {
  try {
    const response = await fetch(`${proxy}/https://swapi.co/api/films`);
    const { results } = await response.json();

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};
