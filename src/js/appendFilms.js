
export default function appendFilms(films, containerForFilms) {
  console.log(films);
  const filmsItem = films
    .map(film => {
      return `
          <div class="movie-card" data-id="${film.id}">
            <img 
            class="movie__image"
            src="https://image.tmdb.org/t/p/w500${film.poster_path}" 
            alt="${film.title}" 
            loading="lazy"          
            />
            <p class="movie__title">${film.title}</p>
            <p class="movie__genresAndReleaseDate">${getGenres(
              genre_ids,
              allGenres
            )} | ${film.release_date.slice(0, 4)}</p>
          </div>
        `;
    })
    .join('');
  containerForFilms.insertAdjacentHTML('beforeend', filmsItem);
}
