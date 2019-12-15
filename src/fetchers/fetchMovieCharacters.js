import proxy from './proxy';

export default async (urls) => {
  try {
    const map = (url) => {
      return fetch(`${proxy}/${url}`)
            .then(response => response.json());
    };

    return await Promise.all(urls.map(map));
  } catch (error) {
    throw new Error(error.message);
  }
};
