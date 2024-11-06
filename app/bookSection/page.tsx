'use client';
import React, { useState, useEffect } from 'react';
import { fetchBooks } from '@/app/actions/fetchBooks';
import { FaChevronDown } from 'react-icons/fa';
import BookCard from '../components/common/bookCard'; // Import the BookCard component

const BookSection = () => {
  const [activeCategory, setActiveCategory] = useState<'popular' | 'mostRead'>('popular');
  const [activeGenre, setActiveGenre] = useState('Fiction'); // Default genre
  const [booksData, setBooksData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      setError('');
      try {
        const { books } = await fetchBooks(activeCategory, activeGenre);
        setBooksData(books);
      } catch (err) {
        setError('Failed to load books. Please try again.');
      } finally {
        setIsLoading(false);
      }
      setVisibleCount(5);
    };
    loadBooks();
  }, [activeCategory, activeGenre]);

  // Debounce search
  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
        const data = await res.json();
        setSearchResults(data.items ? formatBooks(data.items) : []);
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
      }
    };

    const debounceTimeout = setTimeout(fetchBooks, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const formatBooks = (books) =>
    books.map((book) => {
      const volumeInfo = book.volumeInfo || {};
      const imageLinks = volumeInfo.imageLinks || {};

      const image = imageLinks.large || imageLinks.medium || imageLinks.thumbnail || '/path/to/default-image.jpg';

      return {
        id: book.id,
        title: volumeInfo.title || 'No title available',
        author: volumeInfo.authors?.join(', ') || 'No author available',
        image: image,
        description: volumeInfo.description || 'No description available',
        genre: volumeInfo.categories || 'No categories available',
        published_date: volumeInfo.publishedDate || 'No published date available', // Add published date
        pageCount: volumeInfo.pageCount || 'No page count available', // Add page count
      };
    });

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };
  const genres = [
    'Fiction',
    'Fantasy',
    'Science Fiction', // More specific than Sci-Fi
    'Mystery',
    'Nonfiction', // More common usage
    'Romance',
    'Thriller',
    'Historical Fiction',
    'Biography',
    'Self-Help',
    'Young Adult Fiction', // More specific
    'Horror',
    'Poetry',
    'Juvenile Fiction', // For Children's books
    'Crime Fiction', // More specific
];
  return (
    <section className="pb-10 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        {/* Loading Indicator */}
        {isLoading && <div className="text-center mb-4">Loading books...</div>}

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
        <div className="flex justify-center flex-wrap space-x-4 mb-6">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`px-3 py-1 rounded text-gray-800 border-2 mb-2 transition-colors duration-300 text-sm hover:bg-black hover:text-white ${
                activeGenre === genre ? 'border-black border-b-4 text-black' : 'bg-gray-50 text-black'
              }`}
              onClick={() => {
                setActiveGenre(genre);
                setSearchTerm(''); 
                setSearchResults([]); 
              }}
            >
              {genre}
            </button>
          ))}
        </div>

        
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

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {searchResults.length > 0
            ? searchResults.slice(0, visibleCount).map((book) => <BookCard key={book.id} {...book} />)
            : booksData.slice(0, visibleCount).map((book) => <BookCard key={book.id} {...book} />)
          }
        </div>

        {/* Load More Button */}
        {searchResults.length === 0 && booksData.length > visibleCount && (
          <div className="flex justify-center mt-4">
            <button
              className="flex items-center px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              onClick={handleLoadMore}
            >
              <span className="mr-2">Load More</span>
              <FaChevronDown />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSection;
