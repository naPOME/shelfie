'use client';
import '../styles/globals.css';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Make sure this path is correct
import ConfettiBackground from '@/app/components/animations/confetiBackground';

const BookCollection = () => {
  const [readingList, setReadingList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <section className='bg-white'>
      <h2 className="text-2xl font-bold mb-4">My Reading List</h2>
      {loading ? (
        <p>Loading..</p> // Show loading text while fetching
      ) : (
        <div className="flex flex-wrap gap-6 ">
          {readingList.length === 0 ? (
            <p>No books in your reading list yet.</p>
          ) : (
            readingList.map((book) => (
              <div key={book.book_id} className="px-1  rounded-lg flex-shrink-0 h-56 border-b-2 border-black   shadow-lg ">
                <img src={book.image} alt={book.title} className=" h-40 object-cover rounded " />
                <h3 className="text-xs font-semibold mt-2 mb-1">{book.title}</h3> {/* Adjusted margin */}
                <p className="text-gray-600 mb-0">{book.author}</p> {/* Removed extra space */}
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default BookCollection;
