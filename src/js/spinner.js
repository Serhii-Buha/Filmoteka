const loader = document.querySelector('#loader');
//export { loader }
function fnDelete() {
  setTimeout(() => {
    loader.classList.remove('loader');
  }, 500);
}

function fnLoad() {
  loader.classList.add('loader');
}

export default { fnDelete, fnLoad };
