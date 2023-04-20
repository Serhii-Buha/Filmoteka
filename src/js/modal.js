export function modal() {
  const refs = {
    backdrop: document.querySelector('.backdrop'),
    closeBtn: document.querySelector('.modal-close-button'),
  };

  addEventListeners();

  function toggleModal() {
    removeEventListeners();
    refs.backdrop.classList.toggle('is-hidden');
    addEventListeners();
  }

  function handleClickOutside(event) {
    if (event.target === refs.backdrop) {
      toggleModal();
    }
  }

  function handleEscPress(event) {
    if (
      event.code === 'Escape' &&
      !refs.backdrop.classList.contains('is-hidden')
    ) {
      toggleModal();
    }
  }

  function addEventListeners() {
    refs.closeBtn.addEventListener('click', toggleModal);
    refs.backdrop.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleEscPress);
  }

  function removeEventListeners() {
    refs.closeBtn.removeEventListener('click', toggleModal);
    refs.backdrop.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleEscPress);
  }
}
