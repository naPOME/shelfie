'use client';
import '../styles/globals.css';
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Adjust the path if needed
import { useRouter } from 'next/navigation';

const BookCollection = () => {
  const [readingList, setReadingList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('readingList'); // Tabs state
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch books based on active tab (filter)
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      let data;

      if (user) {
        switch (activeTab) {
          case 'finished':
            data = await supabase.from('reading_list').select('*').eq('user_id', user.id).eq('status', 'finished');
            break;
          case 'onHold':
            data = await supabase.from('reading_list').select('*').eq('user_id', user.id).eq('status', 'on_hold');
            break;
          default:
            data = await supabase.from('reading_list').select('*').eq('user_id', user.id).eq('status', 'reading');
        }
        setReadingList(data?.data || []);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(); // Fetch books whenever active tab changes
  }, [activeTab]);

  const handleRemoveBook = async (bookId: number) => {
    try {
      const { error } = await supabase.from('reading_list').delete().eq('book_id', bookId);
      if (!error) {
        setReadingList(readingList.filter((book) => book.book_id !== bookId));
      }
    } catch (error) {
      console.error('Error removing book:', error);
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

  return (
    <section className="bg-white p-4">
      <h2 className="text-3xl font-bold mb-4">My Book Collection</h2>

      {/* Tabs for filtering between "Reading List", "Finished", and "On Hold" */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'readingList' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('readingList')}
        >
          Reading List
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'finished' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('finished')}
        >
          Finished
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === 'onHold' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('onHold')}
        >
          On Hold
        </button>
      </div>

      {/* Display books based on the selected tab */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {readingList.length === 0 ? (
            <p>No books in this list.</p>
          ) : (
            readingList.map((book) => (
              <div key={book.book_id} className="relative border p-4 rounded-lg shadow-md bg-white">
                <img src={book.image} alt={book.title} className="h-40 object-cover rounded mb-2" />
                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                <p className="text-gray-600 mb-2">{book.author}</p>

                {/* Options dropdown */}
                <div className="absolute top-2 right-2 text-gray-500 cursor-pointer" onClick={() => setDropdownVisible(dropdownVisible === book.book_id ? null : book.book_id)}>
                  &#x2026; {/* Three dots */}
                </div>

                {dropdownVisible === book.book_id && (
                  <div ref={dropdownRef} className="absolute top-10 right-4 w-40 bg-white border border-gray-300 rounded-md shadow-md z-10">
                    <ul className="text-sm">
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
                        Remove from List
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
