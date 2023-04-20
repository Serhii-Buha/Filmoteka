//<<<<<<< search-film-by-keywords
import clearSectionContainer from './clearSectionContainer';
//import { getTrendingMovies } from './getTrending';
import { getFilmsByKeywords } from './getFilmByKeywords';

//=======
import getTrendingMovies from './getTrending';
import { renderWatchedfilm } from './renderLocalStr';
//>>>>>>> main
// Header refs
const homeBtn = document.querySelector('#home-btn');
const libraryBtn = document.querySelector('#library-btn');
const searchForm = document.querySelector('#search-form');
const libraryButtons = document.querySelector('#library-buttons');
const logoEl = document.querySelector('#header-logo');
//<<<<<<< search-film-by-keywords
export const searchSectionContainer = document.querySelector(
  '.search-section__container'
);
const trendingSectionContainer = document.querySelector('.trending-container');
const paginationSection = document.querySelector('.pagination-section');
const searchPaginationSection = document.querySelector(
  '.search-section__pagination'
);
const searchInput = document.querySelector('.search-form__input');

export let queryVal = '';

//=======
const buttons = document.querySelector('#pagination-buttons');
//>>>>>>> main
// Functions for header

function onLibraryBtnClick() {
  libraryBtn.classList.add('current-btn');
  homeBtn.classList.remove('current-btn');
  libraryButtons.classList.remove('visually-hidden');
  searchForm.classList.add('visually-hidden');
  logoEl.classList.add('header-logo--library');
  buttons.style.display = 'none';
  clearSectionContainer(searchSectionContainer);
  clearSectionContainer(searchPaginationSection);
  searchSectionContainer.classList.add('visually-hidden');
  trendingSectionContainer.classList.remove('visually-hidden');

  renderWatchedfilm();
}

function onHomeBtnClick() {
  homeBtn.classList.add('current-btn');
  libraryBtn.classList.remove('current-btn');
  libraryButtons.classList.add('visually-hidden');
  searchForm.classList.remove('visually-hidden');
  logoEl.classList.remove('header-logo--library');
  //<<<<<<< search-film-by-keywords

  trendingSectionContainer.classList.remove('visually-hidden');
  paginationSection.classList.remove('visually-hidden');
  clearSectionContainer(searchSectionContainer);
  searchSectionContainer.classList.add('visually-hidden');
  clearSectionContainer(searchPaginationSection);
  searchInput.value = '';
  //getTrendingMovies();
  //=======
  buttons.style.display = 'flex';
  getTrendingMovies();
  //>>>>>>> main
}

function onFormSubmit(e) {
  e.preventDefault();
  queryVal = e.currentTarget.elements.searchQuery.value;
  trendingSectionContainer.classList.add('visually-hidden');
  paginationSection.classList.add('visually-hidden');
  searchSectionContainer.classList.remove('visually-hidden');
  clearSectionContainer(searchSectionContainer);
  clearSectionContainer(searchPaginationSection);

  getFilmsByKeywords(1);
}

searchForm.addEventListener('submit', onFormSubmit);
libraryBtn.addEventListener('click', onLibraryBtnClick);
homeBtn.addEventListener('click', onHomeBtnClick);
