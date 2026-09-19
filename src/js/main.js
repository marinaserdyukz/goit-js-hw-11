import { getImagesByQuery } from './pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });

    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });

        return;
      }

      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
});