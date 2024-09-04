'use server';

import axios from 'axios';
import { cache } from 'react';

export const fetchBooks = cache(async () => {
  const popularResponse = await axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=8');
  const mostReadResponse = await axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:nonfiction&maxResults=8');
//   const bestSellersResponse = await axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:best_sellers&maxResults=6');

  const formatBooks = (books: any) =>
    books.map((book: any) => ({
      id: book.id,
      title: book.volumeInfo.title || 'No title available',
      author: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No author available',
      image: book.volumeInfo.imageLinks?.thumbnail || '/path/to/default-image.jpg',
    }));

  return {
    popularBooks: formatBooks(popularResponse.data.items),
    mostReadBooks: formatBooks(mostReadResponse.data.items),
    // bestSellersBooks: formatBooks(bestsellersResponse.data.items),
  };
});
