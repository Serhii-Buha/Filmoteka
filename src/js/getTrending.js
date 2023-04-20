import axios from 'axios';
import spiner from './spinner';

// Змінні)
const url =
  'https://api.themoviedb.org/3/trending/movie/week?api_key=d66303a9f2f21ddca222463dbeed564f';
const genresUrl =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=d66303a9f2f21ddca222463dbeed564f&language=en-US';
const container = document.querySelector('.trending-container');
export { container };
const buttons = document.querySelector('#pagination-buttons');
const pagination = document.querySelector('#paging');
const prevBtn = document.querySelector('#prev');
let currentPage = 1;

// Функція для створення кнопок пагінації (раджу туди не дивитися бо можна поїхати мізками)
function paginatorCreate(data, page) {
  pagination.innerHTML = '';
  let buttonsArray = [];
  const { total_pages } = data;
  if (!page || page === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
  if (window.innerWidth < 768) {
    const firstBtn = document.createElement('button');
    firstBtn.classList.add(`pagination__button${1}`, 'pagination__button');
    firstBtn.textContent = '1';
    pagination.append(firstBtn);
    if (!page || page === 1) {
      firstBtn.classList.add('currentPage');
    }
    if (!page || page <= 3) {
      for (let i = 2; i <= 5; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add(`pagination__button${i}`, 'pagination__button');
        buttonsArray.push(btn);
      }
    } else if (page > 3) {
      firstBtn.style.display = 'none';
      for (let i = page - 2; i <= page + 2; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add(`pagination__button${i}`, 'pagination__button');
        buttonsArray.push(btn);
      }
    }
    pagination.append(...buttonsArray);
  } else {
    const firstBtn = document.createElement('button');
    const lastBtn = document.createElement('button');
    firstBtn.classList.add(`pagination__button${1}`, 'pagination__button');
    lastBtn.classList.add(
      `pagination__button${total_pages}`,
      'pagination__button'
    );
    firstBtn.textContent = '1';
    lastBtn.textContent = total_pages;
    pagination.append(firstBtn);
    if (!page || page === 1) {
      firstBtn.classList.add('currentPage');
    } else if (page === total_pages) {
      lastBtn.classList.add('currentPage');
    }
    if (!page || page <= 4) {
      for (let i = 2; i <= 7; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add(`pagination__button${i}`, 'pagination__button');
        buttonsArray.push(btn);
      }
      const dottedBtn = document.createElement('button');
      dottedBtn.textContent = '...';
      dottedBtn.classList.add(`pagination__button${8}`, 'pagination__button');
      buttonsArray.push(dottedBtn);
    } else if (page <= total_pages - 6) {
      const dottedBtnMinus = document.createElement('button');
      dottedBtnMinus.textContent = '...';
      dottedBtnMinus.classList.add(
        `pagination__button${page - 3}`,
        'pagination__button'
      );
      buttonsArray.push(dottedBtnMinus);
      for (let i = page - 2; i <= page + 2; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add(`pagination__button${i}`, 'pagination__button');
        buttonsArray.push(btn);
      }
      const dottedBtnPlus = document.createElement('button');
      dottedBtnPlus.textContent = '...';
      dottedBtnPlus.classList.add(
        `pagination__button${page + 3}}`,
        'pagination__button'
      );
      buttonsArray.push(dottedBtnPlus);
    } else if (page > total_pages - 6) {
      let num = total_pages - 7;
      const dottedBtn = document.createElement('button');
      dottedBtn.textContent = '...';
      dottedBtn.classList.add(`pagination__button${num}`, 'pagination__button');
      buttonsArray.push(dottedBtn);
      for (let i = total_pages - 6; i <= total_pages - 1; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add(`pagination__button${i}`, 'pagination__button');
        buttonsArray.push(btn);
      }
    }
    pagination.append(...buttonsArray);
    pagination.append(lastBtn);
  }
}
// Ліснер для кнопок назад та вперед
buttons.addEventListener('click', e => {
  if (e.target.id === 'next' || e.target.classList.contains('pagArrowR')) {
    ++currentPage;
    container.innerHTML = '';
    getTrendingMovies(currentPage);
  } else if (
    e.target.id === 'prev' ||
    (e.target.classList.contains('pagArrowL') && currentPage > 1)
  ) {
    --currentPage;
    container.innerHTML = '';
    getTrendingMovies(currentPage);
  }
});
// Ліснер для кнопок пагінації
pagination.addEventListener('click', e => {
  if (e.target.textContent === currentPage) {
    return;
  } else {
    const string = e.target.classList[0];
    const btnNum = string.slice(18);
    currentPage = Number.parseInt(btnNum);
    container.innerHTML = '';
    getTrendingMovies(currentPage);
  }
});
// Запит на сервер та робота з респонсом

//export async function getTrendingMovies(page) {

export default async function getTrendingMovies(page) {
  const options = {
    params: {
      page,
    },
  };
  spiner.fnLoad();
  try {
    const response = await axios.get(url, options);
    const result = response.data.results;
    const data = response.data;
    const genresResponse = await axios.get(genresUrl);
    const genresArray = genresResponse.data.genres;
    result.forEach(el => {
      el.genres = [];
      el.genre_ids.map(el2 => {
        for (let i = 0; i < genresArray.length; i++) {
          if (el2 === genresArray[i].id) {
            el.genres.push(genresArray[i].name);
          }
        }
      });
    });
    appendTrendingGallery(result);
    paginatorCreate(data, page);
    const currentPage = document.querySelector(`.pagination__button${page}`);
    if (currentPage) {
      currentPage.classList.add('currentPage');
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  }
}
// Функція додавання респонсу до розмітки

export function appendTrendingGallery(result) {
  container.insertAdjacentHTML(
    //function appendTrendingGallery(result) {
    //  trendingContainer.insertAdjacentHTML(

    'afterbegin',
    result
      .map(({ title, poster_path, release_date, id, genres }) => {
        const releaseDate = release_date.slice(0, 4);
        let slicedGenres;
        if (genres.length > 2) {
          slicedGenres = genres.slice(0, 2);
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
            alt="${title}" 
            loading="lazy"
            data-id="${id}"         
            />
            <p class="movie__title" data-id="${id}">${title}</p>
            <p class="movie__genresAndReleaseDate" data-id="${id}">${finGenres} | ${releaseDate}</p>
          </div>
        `;
      })
      .join('')
  );
  spiner.fnDelete();
}
// перший виклик функції при завантаженні сторінки
getTrendingMovies();
