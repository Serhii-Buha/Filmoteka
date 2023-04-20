const linkOpenBtn = document.querySelector('[data-action="open-footer-modal"]');
const linkCloseBtn = document.querySelector('[data-action="close-modal"]');
const backdrop = document.querySelector('.js-backdrop');

linkOpenBtn.addEventListener('click', onOpenModal);
linkCloseBtn.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', onBackdropClick);
function onOpenModal() {
  document.body.classList.add('show-modal');
}

function onCloseModal() {
  document.body.classList.remove('show-modal');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
