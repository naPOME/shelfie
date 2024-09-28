'use client';

import React, { useState, useEffect } from 'react';
import BookCard from '@/app/components/common/bookCard';
import BookCollection from '@/pages/bookCollection'; // Import the BookCollection component
import { fetchBooks } from '@/app/actions/fetchBooks';
import { FaChevronDown } from 'react-icons/fa';

const BookSection = () => {
  const [activeCategory, setActiveCategory] = useState<'popular' | 'mostRead'>('popular');
  const [activeGenre, setActiveGenre] = useState(''); // State for selected genre
  const [booksData, setBooksData] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(4); // Number of books to show initially
  const [readingList, setReadingList] = useState<any[]>([]); // State to manage the reading list

  useEffect(() => {
    async function loadData() {
      const { books } = await fetchBooks(activeCategory, activeGenre); // Fetch books based on category and genre
      setBooksData(books);
      setVisibleCount(4); // Reset the visible count when fetching new data
    }
    loadData();
  }, [activeCategory, activeGenre]); // Reload data when category or genre changes

  // Add book to the reading list
  const handleAddToReadingList = (book: any) => {
    setReadingList((prevList) => {
      // Check if book is already in the list
      const isAlreadyAdded = prevList.some((b) => b.id === book.id);
      if (isAlreadyAdded) {
        alert("This book is already in your reading list!");
        return prevList;
      }
      return [...prevList, book];
    });
  };

  // Load more books
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Load 4 more books
  };

  const genres = ['Fiction', 'Fantasy', 'Sci-Fi', 'Mystery', 'Non-fiction']; // Sample genres

  return (
    <section className="pb-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black">Explore Our Collection</h2>
        </div>

        {/* Genre filter buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`px-3 py-1 rounded text-gray-800 border-2 border-gray-500 transition-colors duration-300 text-sm hover:bg-black hover:text-white ${
                activeGenre === genre ? 'rounded-t border-black border-b-4 text-black' : 'bg-gray-50 text-black'
              }`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Category buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-t-3xl transition-colors duration-300 text-sm ${
              activeCategory === 'popular' ? 'rounded-t-3xl border-black border-b-4 text-black font-normal' : 'bg-gray-50 text-black '
            }`}
            onClick={() => {
              setActiveCategory('popular');
              setVisibleCount(4); // Reset the visible count when changing category
            }}
          >
            Popular
          </button>
          <button
            className={`px-4 py-2 rounded-t-3xl transition-colors duration-300 text-sm ${
              activeCategory === 'mostRead' ? 'rounded-t-3xl border-black border-b-4 text-black font-normal' : 'bg-gray-50 text-black'
            }`}
            onClick={() => {
              setActiveCategory('mostRead');
              setVisibleCount(4); // Reset the visible count when changing category
            }}
          >
            Most Read
          </button>
        </div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {booksData.slice(0, visibleCount).map((book: any) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              image={book.image}
              onAddToReadingList={() => handleAddToReadingList(book)} // Pass the book object
            />
          ))}
        </div>


        {/* Load More Button */}
        {booksData.length > 0 && visibleCount < booksData.length && (
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2  text-black rounded-lg mt-2 flex items-center space-x-2 hover:bg-gray-100"
              onClick={handleLoadMore}
            >
              <FaChevronDown />
            </button>
          </div>
        )}
      </div>

      {/* Pass readingList as prop to BookCollection */}
      
    </section>
  );
};

export default BookSection;
