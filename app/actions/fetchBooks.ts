'use server';

import axios from 'axios';
import { cache } from 'react';

export const fetchBooks = cache(async (category: 'popular' | 'mostRead', genre: string = '') => {
  const genreQuery = genre ? `subject:${genre}` : '';

  try {
    // Construct query based on category
    const query = category === 'popular'
      ? `${genreQuery}&orderBy=newest` // Sort by newest for popular books
      : `${genreQuery}&orderBy=relevance`; // Sort by relevance for most read books

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=16`);

    // Function to format books
    const formatBooks = (books: any) =>
      books.map((book: any) => {
        const volumeInfo = book.volumeInfo;
        const imageLinks = volumeInfo.imageLinks;

        // Fetch better image quality, prioritizing large thumbnails or medium-sized images
        const image =
          imageLinks?.large || imageLinks?.medium || imageLinks?.thumbnail || imageLinks?.smallThumbnail || '/path/to/default-image.jpg';

        // Return formatted book data with additional details
        return {
          id: book.id,
          title: volumeInfo.title || 'No title available',
          author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No author available',
          image: image, // Prioritize higher resolution images
          publishedDate: volumeInfo.publishedDate || 'No publication date available',
          description: volumeInfo.description || 'No description available',
          categories: volumeInfo.categories ? volumeInfo.categories.join(', ') : 'No categories available',
          pageCount: volumeInfo.pageCount || 'Unknown page count',
        };
      });

    // Log responses for debugging
    console.log(`${category.charAt(0).toUpperCase() + category.slice(1)} Books Response:`, response.data);

    // Return formatted book data
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
