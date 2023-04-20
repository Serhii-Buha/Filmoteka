import API_KEY from './api-key';

export async function getAllGenres() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const genresResponse = await fetch(url);
  const genresParse = await genresResponse.json();
  const allGenres = genresParse.genres;
  return allGenres;
}

export function getGenres(genresMovie, allGenres) {
  const genresName = filterGenreList(genresMovie, allGenres);
  if (genresName.length > 2) {
    return `${genresName.slice(0, 2).join(', ')} , Others`;
  }

  return genresName.join(', ');
}

function filterGenreList(genresMovie, allGenres) {
  const filterGenres = allGenres.filter(genre =>
    genresMovie.includes(genre.id)
  );
  const genresName = filterGenres.map(genre => {
    return genre.name;
  });
  return genresName;
}
