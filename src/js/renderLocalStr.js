import { container } from './getTrending';

const watchedBtnEl = document.querySelector('.library-button__watched');
const queueBtnEl = document.querySelector('.library-button__queue');

watchedBtnEl.addEventListener('click', renderWatchedfilm);
queueBtnEl.addEventListener('click', renderQueuefilm);

export function renderWatchedfilm() {
  container.innerHTML = '';

  const savedWatchFilm = JSON.parse(localStorage.getItem('watched'));
  const values = Object.values(savedWatchFilm);

  appendChoiceFilm(values);
}
function renderQueuefilm() {
  container.innerHTML = '';

  const savedQueueFilm = JSON.parse(localStorage.getItem('queue'));
  const values = Object.values(savedQueueFilm);
  appendChoiceFilm(values);
}

function appendChoiceFilm(result) {
  container.insertAdjacentHTML(
    'afterbegin',
    result
      .map(({ title, poster_path, release_date, id, genres }) => {
        const genreList = [];
        genres.forEach(element => {
          genreList.push(element.name);
        });
        const releaseDate = release_date.slice(0, 4);
        let slicedGenres;
        if (genres.length > 2) {
          slicedGenres = genreList.slice(0, 2);
          slicedGenres.push('Others');
        } else {
          slicedGenres = genres;
        }
        const finGenres = slicedGenres.join(',  ');
        return `
            <div class="movie-card" data-id="${id}">
              <img 
              class="movie__image"
              src="https://image.tmdb.org/t/p/w500${poster_path}" 
              data-id="${id}"
              alt="${title}" 
              loading="lazy"          
              />
              <p class="movie__title" data-id="${id}">${title} </p>
              <p class="movie__genresAndReleaseDate" data-id="${id}">${finGenres} | ${releaseDate} </p>
            </div>
          `;
      })
      .join('')
  );
}
