'use client';

import React, { useState, useEffect } from 'react';
import BookCard from '@/app/components/common/bookCard';
import { fetchBooks } from '@/app/actions/fetchBooks';
import { FaChevronDown } from 'react-icons/fa'; // Importing an icon for "Load More"

const BookSection = () => {
  const [activeCategory, setActiveCategory] = useState<'popular' | 'mostRead'>('popular');
  const [activeGenre, setActiveGenre] = useState(''); // State for selected genre
  const [booksData, setBooksData] = useState({
    popular: [],
    mostRead: [],
  });
  const [visibleCount, setVisibleCount] = useState(4); // Number of books to show initially

  useEffect(() => {
    async function loadData() {
      const { popularBooks, mostReadBooks } = await fetchBooks(activeGenre); // Fetch books based on genre
      setBooksData({
        popular: popularBooks,
        mostRead: mostReadBooks,
      });
    }
    loadData();
  }, [activeGenre]); // Reload data when genre changes

  const handleAddToReadingList = (id: string) => {
    alert(`Book with ID: ${id} added to your reading list!`);
  };

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

        {/* Category buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-t-3xl transition-colors duration-300 ${
              activeCategory === 'popular' ? 'rounded-t-3xl border-black border-b-4 text-black' : 'bg-gray-50 text-black'
            }`}
            onClick={() => {
              setActiveCategory('popular');
              setVisibleCount(4); // Reset the visible count when changing category
            }}
          >
            Popular This Week
          </button>
          <button
            className={`px-4 py-2 rounded-t-3xl transition-colors duration-300 ${
              activeCategory === 'mostRead' ? 'rounded-t-3xl border-black border-b-4 text-black' : 'bg-gray-50 text-black'
            }`}
            onClick={() => {
              setActiveCategory('mostRead');
              setVisibleCount(4); // Reset the visible count when changing category
            }}
          >
            Most Read
          </button>
        </div>

        {/* Genre filter buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`px-3 py-1 rounded text-gray-800    border-2 border-gray-500 transition-colors duration-300 text-sm ${
                activeGenre === genre ? 'rounded-t border-black border-b-4 text-black' : 'bg-gray-50 text-black'
              }`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {booksData[activeCategory].slice(0, visibleCount).map((book: any) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              image={book.image}
              onAddToReadingList={handleAddToReadingList}
            />
          ))}
        </div>

        {/* Load More Icon */}
        {visibleCount < booksData[activeCategory].length && (
          <div className="flex justify-center mt-6">
            <button
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
              onClick={handleLoadMore}
            >
              <span>Load More</span>
              <FaChevronDown />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSection;
