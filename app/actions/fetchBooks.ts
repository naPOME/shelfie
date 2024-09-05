'use server';

import axios from 'axios';
import { cache } from 'react';

export const fetchBooks = cache(async (category: 'popular' | 'mostRead', genre: string = '') => {
  const genreQuery = genre ? `subject:${genre}` : '';

  try {
    // Construct query based on category
    const query = category === 'popular'
      ? `${genreQuery}&orderBy=newest` // Example query; adjust as needed
      : `${genreQuery}&orderBy=relevance`; // Example query; adjust as needed

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=4`);

    const formatBooks = (books: any) =>
      books.map((book: any) => {
        const imageLinks = book.volumeInfo.imageLinks;
        const image = imageLinks?.thumbnail || imageLinks?.smallThumbnail || '/path/to/default-image.jpg';

        return {
          id: book.id,
          title: book.volumeInfo.title || 'No title available',
          author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No author available',
          image: image,
        };
      });

    // Log responses for debugging
    console.log(`${category.charAt(0).toUpperCase() + category.slice(1)} Books Response:`, response.data);

    return {
      books: formatBooks(response.data.items),
    };

  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      books: [],
    };
  }
});
