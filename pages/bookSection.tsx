'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '@/app/components/common/bookCard'; // Assuming BookCard is in the same directory

const GoogleBooks: React.FC = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from Google Books API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=6'
        );
        setBooks(response.data.items);
      } catch (error) {
        console.error('Error fetching data from Google Books API', error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddToReadingList = (id: string) => {
    alert(`Book with ID: ${id} added to the reading list!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book: any) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.volumeInfo.title}
          author={book.volumeInfo.authors?.[0] || 'Unknown Author'}
          image={book.volumeInfo.imageLinks?.thumbnail || 'default-image-url.jpg'}
          onAddToReadingList={handleAddToReadingList}
        />
      ))}
    </div>
  );
};

export default GoogleBooks;
