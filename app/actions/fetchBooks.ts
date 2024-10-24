'use server';

export const fetchBooks = async (category: 'popular' | 'mostRead', genre: string = '') => {
  const genreQuery = genre ? `subject:${genre}` : '';

  // Construct query based on category
  const query = category === 'popular'
    ? `${genreQuery}&orderBy=newest` // Sort by newest for popular books
    : `${genreQuery}&orderBy=relevance`; // Sort by relevance for most read books

  try {
    // Use fetch API to get data
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=16`, {
      next: { revalidate: 0 } // This disables caching for this fetch request
    });

    // Check if the response is ok
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    const data = await response.json();

    const formatBooks = (books: any) =>
      books.map((book: any) => {
        const volumeInfo = book.volumeInfo;
        const imageLinks = volumeInfo.imageLinks;

        
        const image = 
          imageLinks?.large || 
          imageLinks?.medium || 
          imageLinks?.thumbnail || 
          imageLinks?.smallThumbnail || 
          '/path/to/default-image.jpg'; 

        return {
          id: book.id,
          title: volumeInfo.title || 'No title available',
          author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No author available',
          image: image,
          publishedDate: volumeInfo.publishedDate || 'No publication date available',
          description: volumeInfo.description || 'No description available',
          categories: volumeInfo.categories ? volumeInfo.categories.join(', ') : 'No categories available',
          pageCount: volumeInfo.pageCount || 'Unknown page count',
        };
      });

    // Log responses for debugging
    console.log(`${category.charAt(0).toUpperCase() + category.slice(1)} Books Response:`, data);

    // Return formatted book data
    return {
      books: formatBooks(data.items || []),
    };

  } catch (error) {
    console.error('Error fetching books:', error);
    return {
      books: [],
    };
  }
};
