'use client';
import React, { useState } from 'react';
import BookCard from '@/app/components/common/bookCard';

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
};

const booksData: { [key: string]: Book[] } = {
  popular: [
    { id: '1', title: 'The Winds of Winter', author: 'George R. R. Martin', image: '/img/winds.jpg' },
    { id: '2', title: 'Dune', author: 'Frank Herbert', image: '/img/dune.jpg' },
  ],
  mostRead: [
    { id: '3', title: '1984', author: 'George Orwell', image: '/img/1984.jpg' },
    { id: '4', title: 'The Catcher in the Rye', author: 'J.D. Salinger', image: '/img/catcher.jpg' },
  ],
  bestSellers: [
    { id: '5', title: 'Where the Crawdads Sing', author: 'Delia Owens', image: '/img/crawdads.jpg' },
    { id: '6', title: 'The Night Circus', author: 'Erin Morgenstern', image: '/img/night_circus.jpg' },
  ],
};

const BookSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'popular' | 'mostRead' | 'bestSellers'>('popular');

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
              activeCategory === 'popular' ? '  rounded-t-3xl border-black border-b-4 text-black' : 'bg-gray-50 text-black  '
            }`}
            onClick={() => setActiveCategory('popular')}
          >
            Popular This Week
          </button>
          <button
            className={`px-4 py-2 rounded-t-3xl transition-colors duration-300 ${
              activeCategory === 'mostRead' ? '  rounded-t-3xl border-black border-b-4 text-black' : 'bg-gray-50 text-black  '
            }`}
            onClick={() => setActiveCategory('mostRead')}
          >
            Most Read
          </button>
          <button
            className={`px-4 py-2 rounded-t-3xl transition-colors duration-300 ${
              activeCategory === 'bestSellers' ?'  rounded-t-3xl border-black border-b-4 text-black' : 'bg-gray-50 text-black  '
            }`}
            onClick={() => setActiveCategory('bestSellers')}
          >
            Best Sellers
          </button>
        </div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {booksData[activeCategory].map((book) => (
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