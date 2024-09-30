import { fetchImages } from './js/pixabay-api.js';
import { renderImageCards, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('#load-more-btn');
let currentQuery = '';
let currentPage = 1;
const perPage = 12;


let lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = event.target.elements.query.value.trim();

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
    });
    event.target.elements.query.focus();
    return;
  }

  clearGallery();
  currentPage = 1;
  loadMoreButton.style.display = 'none';

  try {
    showLoader();
    const images = await fetchImages(currentQuery, currentPage, perPage);
    hideLoader();

    if (images.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'Sorry, no images found for your search query.',
      });
    } else {
      renderImageCards(images);
      lightbox.refresh(); // Оновлення lightbox після рендерингу

      if (images.length === perPage) {
        loadMoreButton.style.display = 'block';
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;

  try {
    showLoader();
    const images = await fetchImages(currentQuery, currentPage, perPage);
    hideLoader();
    renderImageCards(images);
    lightbox.refresh(); // Оновлення lightbox після рендерингу

    if (images.length < perPage) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block'; // Показати, якщо є більше сторінок
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again later.',
    });
  }
});