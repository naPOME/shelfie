'use server';

import axios from 'axios';
import { cache } from 'react';

export const fetchBooks = cache(async (genre: string = '') => {
  const genreQuery = genre ? `&q=subject:${genre}` : '';
  const popularResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction${genreQuery}&maxResults=4`);
  const mostReadResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:nonfiction${genreQuery}&maxResults=4`);

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

  return {
    popularBooks: formatBooks(popularResponse.data.items),
    mostReadBooks: formatBooks(mostReadResponse.data.items),
  };
});



