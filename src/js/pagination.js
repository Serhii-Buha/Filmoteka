import { leftArrowSvg, rigthArrowSvg } from './arrows-for-pagination';
const searchPagination = document.querySelector('.search-section__pagination');

const maxVisibleBtns = 5;

const renderBtn = (value, caption = null, cls = null) =>
  `<button class="pag-button${cls ? ` ${cls}` : ''}" data-page="${value}">${
    caption || value
  }</button>`;

export function makePagination(totalPages, currentPage, callback) {
  if (totalPages < 1) {
    return;
  }
  const visibleButtons = Math.min(totalPages, maxVisibleBtns);
  let startButton = currentPage - Math.floor(maxVisibleBtns / 2);
  startButton = startButton < 1 ? 1 : startButton;
  startButton =
    startButton + visibleButtons > totalPages
      ? totalPages - visibleButtons + 1
      : startButton;

  const endButton = visibleButtons + startButton - 1;

  let buttons = '';

  buttons += renderBtn(currentPage - 1, leftArrowSvg, 'pag-button--arrow');

  if (window.innerWidth > 768) {
    if (startButton > 1) {
      buttons += renderBtn(1);
      if (startButton > 2) {
        buttons += `<span>…</span>`;
      }
    }
  }

  for (let page = startButton; page <= endButton; page++) {
    buttons += renderBtn(
      page,
      page,
      currentPage === page ? 'pag-button__current' : ''
    );
  }

  if (window.innerWidth > 768) {
    if (endButton < totalPages) {
      if (endButton < totalPages - 1) {
        buttons += `<span>…</span>`;
      }
      buttons += renderBtn(totalPages);
    }
  }

  buttons += renderBtn(currentPage + 1, rigthArrowSvg, 'pag-button--arrow');

  searchPagination.innerHTML = buttons;

  const onClick = e => {
    const { page } = e.target.dataset;
    if (page >= 1 && page <= totalPages) {
      callback(Number(page));
      searchPagination.removeEventListener('click', onClick);
    }
  };
  searchPagination.addEventListener('click', onClick);
}
