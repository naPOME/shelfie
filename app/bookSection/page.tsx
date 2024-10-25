'use client';
import React, { useState, useEffect } from 'react';
import { fetchBooks } from '@/app/actions/fetchBooks';
import { FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import BookCard from '../components/common/bookCard'; // Import the BookCard component

interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  publishedDate: string;
  description: string;
  categories: string;
}

const BookSection = () => {
  const [activeCategory, setActiveCategory] = useState<'popular' | 'mostRead'>('popular');
  const [activeGenre, setActiveGenre] = useState('');
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const loadBooks = async () => {
      const { books } = await fetchBooks(activeCategory, activeGenre);
      setBooksData(books);
      setVisibleCount(4);
    };
    loadBooks();
  }, [activeCategory, activeGenre]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      const data = await res.json();
      setSearchResults(data.items ? formatBooks(data.items) : []);
      setIsSearching(false);
    };

    const debounceTimeout = setTimeout(fetchBooks, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const formatBooks = (books: any) =>
    books.map((book: any) => {
      const volumeInfo = book.volumeInfo || {};
      const imageLinks = volumeInfo.imageLinks || {};
      
      const image = 
        imageLinks.large || 
        imageLinks.medium || 
        imageLinks.thumbnail || 
        imageLinks.smallThumbnail || 
        '/path/to/default-image.jpg'; 

      return {
        id: book.id,
        title: volumeInfo.title || 'No title available',
        author: volumeInfo.authors?.length ? volumeInfo.authors.join(', ') : 'No author available',
        image: image,
        publishedDate: volumeInfo.publishedDate || 'No publication date available',
        description: volumeInfo.description || 'No description available',
        categories: volumeInfo.categories ? volumeInfo.categories.join(', ') : 'No categories available',
      };
    });

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const genres = ['Fiction', 'Fantasy', 'Sci-Fi', 'Mystery', 'Non-fiction'];

  return (
    <section className="pb-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          {/* <h2 className="text-3xl font-bold text-black">Explore Our Collection</h2> */}
        </div>

        {/* Search Input */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              className="ml-3 outline-none bg-transparent placeholder-gray-500 text-sm text-gray-700"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for books..."
            />
          </div>
        </div>

        {/* Genre filter buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`px-3 py-1 rounded text-gray-800 border-2 transition-colors duration-300 text-sm hover:bg-black hover:text-white ${
                activeGenre === genre ? 'border-black border-b-4 text-black' : 'bg-gray-50 text-black'
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
              activeCategory === 'popular' ? 'border-black border-b-4 text-black' : 'bg-gray-50 text-black'
            }`}
            onClick={() => {
              setActiveCategory('popular');
              setVisibleCount(4);
            }}
          >
            Popular
          </button>
          <button
            className={`px-4 py-2 rounded-t-3xl transition-colors duration-300 text-sm ${
              activeCategory === 'mostRead' ? 'border-black border-b-4 text-black' : 'bg-gray-50 text-black'
            }`}
            onClick={() => {
              setActiveCategory('mostRead');
              setVisibleCount(4);
            }}
          >
            Most Read
          </button>
        </div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(searchTerm ? searchResults : booksData)
            .slice(0, visibleCount)
            .map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title} // Make sure to use the formatted title
                author={book.author} // Use the formatted author
                image={book.image} // Use the formatted image
              />
            ))}
        </div>

        {/* Load More Button */}
        {(booksData.length > visibleCount || searchResults.length > visibleCount) && (
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 text-black rounded-lg mt-2 flex items-center space-x-2 hover:bg-gray-100"
              onClick={handleLoadMore}
            >
              <FaChevronDown />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSection;
