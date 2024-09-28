const API_KEY = '46234405-5fabb3e7cd0fd4a5073c0abd3';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error("Error fetching images", error);
    throw error;
  }
};
