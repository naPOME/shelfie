'use client';

import React, { useState, useEffect } from 'react';
import BookCard from '@/app/components/common/bookCard';
import { fetchBooks } from '@/app/actions/fetchBooks';

const BookSection = () => {
  const [activeCategory, setActiveCategory] = useState<'popular' | 'mostRead' >('popular');
  const [booksData, setBooksData] = useState({
    popular: [],
    mostRead: [],

  });

  useEffect(() => {
    async function loadData() {
      const { popularBooks, mostReadBooks } = await fetchBooks();
      setBooksData({
        popular: popularBooks,
        mostRead: mostReadBooks,
        
      });
    }
    loadData();
  }, []);

  const handleAddToReadingList = (id: string) => {
    alert(`Book with ID: ${id} added to your reading list!`);
  };

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
            onClick={() => setActiveCategory('popular')}
          >
            Popular This Week
          </button>
          <button
            className={`px-4 py-2 rounded-t-3xl transition-colors duration-300 ${
              activeCategory === 'mostRead' ? 'rounded-t-3xl border-black border-b-4 text-black' : 'bg-gray-50 text-black'
            }`}
            onClick={() => setActiveCategory('mostRead')}
          >
            Most Read
          </button>
          {/* <button
            className={`px-4 py-2 rounded-t-3xl transition-colors duration-300 ${
              activeCategory === 'bestSellers' ? 'rounded-t-3xl border-black border-b-4 text-black' : 'bg-gray-50 text-black'
            }`}
            onClick={() => setActiveCategory('bestSellers')}
          >
            Best Sellers
          </button> */}
        </div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {booksData[activeCategory].map((book:any) => (
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
      </div>
    </section>
  );
};

export default BookSection;
