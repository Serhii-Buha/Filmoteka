import fetchFilmByKeywords from './fetchFilmByKeywords';
import { getGenres, getAllGenres } from './getGenres';
import { searchSectionContainer } from './header';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { makePagination } from './pagination';
import spiner from './spinner';

export async function getFilmsByKeywords(page) {
  spiner.fnLoad();
  try {
    const respons = await fetchFilmByKeywords(page);
    if (respons.data.total_results === 0) {
      spiner.fnDelete();
      return Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );
    }
    const allGenres = await getAllGenres();
    appendFilms(respons.data.results, allGenres);
    makePagination(respons.data.total_pages, page, getFilmsByKeywords);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } catch (error) {
    Notify.failure(error.message);
    throw error;
  }
}
function appendFilms(films, allGenres) {
  const filmsItem = films
    .map(({ title, poster_path, release_date, id, genre_ids }) => {
      return `
          <div class="search-section__item" data-id="${id}">
            <img 
            class="search-section__image"
            src= "${
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : 'https://sd.keepcalms.com/i/keep-calm-poster-not-found.png'
            } "
            alt="${title}" 
            loading="lazy" 
            data-id="${id}"         
            />

            <p class="search-section__title" data-id="${id}">${title}</p>
            <p class="search-section__discription" data-id="${id}">${
        getGenres(genre_ids, allGenres)
          ? getGenres(genre_ids, allGenres)
          : `Genre unknown`
      } | ${release_date ? release_date.slice(0, 4) : `Unknown`}</p>
          </div>
        `;
    })
    .join('');
  searchSectionContainer.innerHTML = filmsItem;
  spiner.fnDelete();
}
