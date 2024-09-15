'use client';
import '../styles/globals.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // To navigate to the book details component
import { supabase } from '@/lib/supabaseClient'; // Ensure this path is correct

const BookCollection = () => {
  const [readingList, setReadingList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); // Using Next.js router for navigation

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

  // Function to remove a book from the reading list
  const handleRemoveBook = async (bookId: number) => {
    try {
      const { error } = await supabase
        .from('reading_list')
        .delete()
        .eq('book_id', bookId); // Delete the book by its book_id

      if (error) {
        console.error('Error removing book:', error);
      } else {
        setReadingList(readingList.filter((book) => book.book_id !== bookId)); // Update UI
      }
    } catch (error) {
      console.error('An error occurred while removing the book:', error);
    }
  };

  // Function to handle navigation to the book details component
  const handleShowDetails = (bookId: number) => {
    router.push(`/book-details/${bookId}`); // Navigate to the book details page
  };

  return (
    <section className="bg-white">
      <h2 className="text-2xl font-bold mb-4">My Reading List</h2>
      {loading ? (
        <p>Loading..</p> // Show loading text while fetching
      ) : (
        <div className="flex flex-wrap gap-6">
          {readingList.length === 0 ? (
            <p>No books in your reading list yet.</p>
          ) : (
            readingList.map((book) => (
              <div
                key={book.book_id}
                className="px-2 py-4 rounded-lg flex-shrink-0 h-56 border-b-2 border-black shadow-lg cursor-pointer"
                onClick={() => handleShowDetails(book.book_id)} // Navigate to details page when clicked
              >
                <img src={book.image} alt={book.title} className="h-40 object-cover rounded" />
                <h3 className="text-xs font-semibold mt-2 mb-1">{book.title}</h3>
                <p className="text-gray-600 mb-2">{book.author}</p>

                {/* Options for remove */}
                <div className="mt-2">
                  <button
                    className="text-red-500 text-sm underline"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the click event on the card itself
                      handleRemoveBook(book.book_id);
                    }}
                  >
                    Remove from Reading List
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default BookCollection;
