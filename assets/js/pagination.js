/**
 * @preserve W Zhang
 * For weixuanz.github.io
 */

const loadBtn = document.querySelector('#loadmore-btn')
loadBtn.addEventListener('click', loadNextPage)

function loadNextPage () {
  const postList = document.querySelector('#blog-list')
  const currentPage = +postList.getAttribute('data-page')
  const totalPages = +postList.getAttribute('data-totalPages')

  const setBusy = () => {
    loadBtn.textContent = "Loading..."
    loadBtn.disabled = true
  }
  const setInitial = () => {
    loadBtn.textContent = "Load more..."
    loadBtn.disabled = false
  }

  if (currentPage == totalPages) {
    return
  }

  setBusy()

  const opts = {
    method: 'GET',      
    headers: {}
  };

  fetch(`/page${currentPage + 1}`, opts)
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html')
    doc.querySelectorAll('#blog-list a').forEach(el => postList.appendChild(el))

    setInitial()
    postList.setAttribute('data-page', currentPage + 1)

    if (currentPage + 1 == totalPages) {
      loadBtn.onclick = null
      loadBtn.remove()
    }
  });
}
