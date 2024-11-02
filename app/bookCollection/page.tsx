'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Book {
  book_id: number;
  title: string;
  author: string;
  image: string;
  status: 'reading' | 'finished';
  
}

const BookCollection = () => {
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [filter, setFilter] = useState<'All' | 'Reading' | 'Finished'>('All');
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchReadingList = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('reading_list')
            .select('*')
            .eq('user_id', user.id);

          if (error) {
            console.error('Error fetching reading list:', error);
          } else {
            setReadingList(data || []);
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

  const handleShowDetails = (bookId: number) => {
    router.push(`/bookDetail/${bookId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredReadingList = readingList.filter((book) => {
    if (filter === 'Reading') return book.status === 'reading';
    if (filter === 'Finished') return book.status === 'finished';
    return true;
  });

  return (
    <section className="bg-gray-100 min-h-screen px-6 py-10">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">My Reading List</h2>

      
      <div className="flex space-x-4 mb-8 ">
        {['All', 'Reading', 'Finished'].map((status) => (
          <button
            key={status}
            className={`px-5 py-1 rounded-lg border ${filter === status ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'} transition-colors`}
            onClick={() => setFilter(status as 'All' | 'Reading' | 'Finished')}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading your reading list...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredReadingList.length === 0 ? (
            <p className="text-gray-500">No books in this category.</p>
          ) : (
            filteredReadingList.map((book) => (
              <div key={book.book_id} className="relative p-4 bg shadow rounded-lg flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className="w-full h-48 mb-4"  onClick={()=>handleShowDetails(book.book_id)}>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900 truncate text-center">{book.title}</h3>
                  <p className="text-sm text-center text-gray-600 truncate">{book.author}</p>
                </div>

                {/* Options Dropdown */}
                <div
                  className="absolute top-3 right-3 text-gray-900 hover:text-gray-600 cursor-pointer"
                  onClick={() => setDropdownVisible(dropdownVisible === book.book_id ? null : book.book_id)}
                >
                  &#x2026;
                </div>

                {dropdownVisible === book.book_id && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-3 top-10 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                  >
                    <ul className="text-sm text-gray-700">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleShowDetails(book.book_id)}
                      >
                        Book Details
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                        onClick={() => handleRemoveBook(book.book_id)}
                      >
                        Remove Book
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
