import axios from 'axios';
import { modalLocalStr } from './modalLocalStr';
const trendingContainer = document.querySelector('.trending-container');
const movieBackdrop = document.querySelector('#movie-backdrop');
const apiKey = 'd66303a9f2f21ddca222463dbeed564f';
const movieModal = document.querySelector('.modal-content');

function appendMovieCard(data) {
  const {
    id,
    title,
    poster_path,
    original_title,
    vote_average,
    vote_count,
    popularity,
    overview,
    genres,
  } = data;
  const votesAvgFixed = vote_average.toFixed(1);
  const popularityFixed = popularity.toFixed(0);
  const genre = genres[0].name;
  const modalMarkup = `
  <div class="modal-image">
    <img 
      src="https://image.tmdb.org/t/p/w500${poster_path}"
      alt="постер" 
     />
  </div>
  <div class="modal-text-content">
    <h3>${title}</h3>
    <p class="modal-text-content-id">${id}</p>
    <ul class="modal-text-content-list">
      <li>
        <p>Vote / Votes</p>
        <p><span>${votesAvgFixed}</span> / ${vote_count}</p>
      </li>
      <li class="modal-text-content-list-element">
        <p>Popularity</p>
        <p>${popularityFixed}</p>
      </li>
      <li class="modal-text-content-list-element">
        <p>Original Title</p>
        <p>${original_title}</p>
      </li>
      <li class="modal-text-content-list-element">
        <p>Genre</p>
        <p>${genre}</p>
      </li>
    </ul>
    <p class="modal-text-content-about">About</p>
    <p class="modal-text-content-about-text">
      ${overview}
    </p>
    <div class="modal-buttons">
      <button class="modal-buttons-one">add to Watched</button>
      <button class="modal-buttons-two">add to queue</button>
    </div>
    <a href="https://www.youtube.com/results?search_query=${title}" target="_blank">
      <button class="modal-buttons-watchTreiler">Watch the trailer</button>
    </a>
    
  </div>
`;

  movieModal.insertAdjacentHTML('beforeend', modalMarkup);
  modalLocalStr();
}

async function getMovieById(event) {
  movieModal.innerHTML = '';
  if (
    event.target.classList.contains('movie-card') ||
    event.target.classList.contains('movie__image') ||
    event.target.classList.contains('movie__title') ||
    event.target.classList.contains('movie__genresAndReleaseDate')
  ) {
    movieBackdrop.classList.toggle('is-hidden');
    try {
      const id = event.target.dataset.id;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      const data = response.data;

      appendMovieCard(data);
    } catch (error) {
      console.log(error);
    }
  } else return;
}

trendingContainer.addEventListener('click', getMovieById);
