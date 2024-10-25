'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchBooks = async () => {
      setIsSearching(true);
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      const data = await res.json();
      setSearchResults(data.items || []);
      setIsSearching(false);
      setShowDropdown(true);
    };

    const debounceTimeout = setTimeout(fetchBooks, 300); // debounce API requests
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      {/* Search Input */}
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
          onFocus={() => setShowDropdown(true)}
          placeholder="Search for books..."
        />
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && searchTerm && (
        <div
          className="absolute top-12 left-0 w-96 bg-white rounded-lg shadow-lg overflow-y-auto z-50"
          style={{ maxHeight: '400px' }}
        >
          {isSearching && <p className="p-4 text-gray-500">Searching...</p>}
          {searchResults.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="w-12 h-16 mr-4 rounded-lg shadow-sm object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800">{book.volumeInfo.title}</h3>
                <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
              </div>
            </Link>
          ))}
          {!isSearching && searchResults.length === 0 && (
            <p className="p-4 text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
