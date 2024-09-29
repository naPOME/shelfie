'use client';
import '../styles/globals.css';
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Make sure this path is correct
import { useRouter } from 'next/navigation'; // For navigation

const BookCollection = () => {
  const [readingList, setReadingList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null); // For controlling dropdown visibility
  const [filter, setFilter] = useState<'All' | 'Reading' | 'Finished'>('All'); // State for filter
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to handle outside click detection

  // Fetch the reading list from Supabase when the component mounts
  useEffect(() => {
    const fetchReadingList = async () => {
      try {
        setLoading(true);

        // Get the logged-in user's details
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Fetch the reading list for the user
          const { data, error } = await supabase
            .from('reading_list')
            .select('*')
            .eq('user_id', user.id); // Filter by logged-in user's ID

          if (error) {
            console.error('Error fetching reading list:', error);
          } else {
            setReadingList(data || []); // Set the reading list state
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching the reading list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReadingList();
  }, []);

  // Handle removing a book from the reading list
  const handleRemoveBook = async (bookId: number) => {
    try {
      const { error } = await supabase
        .from('reading_list')
        .delete()
        .eq('book_id', bookId);

      if (error) {
        console.error('Error removing book:', error);
      } else {
        setReadingList(readingList.filter((book) => book.book_id !== bookId));
      }
    } catch (error) {
      console.error('An error occurred while removing the book:', error);
    }
  };

  // Handle showing book details
  const handleShowDetails = (bookId: number) => {
    router.push(`/bookDetail/${bookId}`); // Navigate to book details page
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(null); // Close dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter books based on the filter state
  const filteredReadingList = readingList.filter((book) => {
    if (filter === 'Reading') return book.status === 'reading';
    if (filter === 'Finished') return book.status === 'finished';
    return true; // 'All' filter
  });

  return (
    <section className='bg-white'>
      <h2 className="text-2xl font-bold mb-4">My Reading List</h2>

      {/* Filter Buttons */}
      <div className="mb-6">
        <button
          className={`px-4 py-2 rounded ${filter === 'All' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 ml-2 rounded ${filter === 'Reading' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('Reading')}
        >
          On Reading
        </button>
        <button
          className={`px-4 py-2 ml-2 rounded ${filter === 'Finished' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('Finished')}
        >
          Finished
        </button>
      </div>

      {loading ? (
        <p>Loading..</p> // Show loading text while fetching
      ) : (
        <div className="flex flex-wrap gap-6">
          {filteredReadingList.length === 0 ? (
            <p>No books in this category.</p>
          ) : (
            filteredReadingList.map((book) => (
              <div key={book.book_id} className="relative px-1 rounded-lg flex-shrink-0 h-56 border-b-2 border-black shadow-lg">
                <img src={book.image} alt={book.title} className="h-40 object-cover rounded" />
                <h3 className="text-xs font-semibold mt-2 mb-1">{book.title}</h3>
                <p className="text-gray-600 mb-0">{book.author}</p>

                {/* Three dots for options at the top right */}
                <div
                  className="absolute bottom-0 text-red-500 right-2 cursor-pointer"
                  onClick={() => setDropdownVisible(dropdownVisible === book.book_id ? null : book.book_id)} // Toggle dropdown
                >
                  &#x2026; {/* Three dots icon */}
                </div>

                {/* Dropdown options */}
                {dropdownVisible === book.book_id && (
                  <div ref={dropdownRef} className="absolute top-14 left-8 w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
                    <ul className="text-sm">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleShowDetails(book.book_id)} // Navigate to details
                      >
                        Book Details
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                        onClick={() => handleRemoveBook(book.book_id)} // Remove from reading list
                      >
                        Remove from Reading List
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default BookCollection;
