

import '/home/pom/Shelfie/shelfie/styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import axios from 'axios';
import { FaBookOpen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const BookDetail = () => {
  const router = useRouter();
  const { bookId } = router.query;
  const [bookDetails, setBookDetails] = useState<any>(null);
  const [summary, setSummary] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [readingState, setReadingState] = useState<'Not Started' | 'Reading' | 'Finished'>('Not Started');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (bookId) {
        try {
          setLoading(true);
          // Fetch book details from Supabase
          const { data, error } = await supabase
            .from('reading_list')
            .select('*')
            .eq('book_id', bookId)
            .single();

          if (error) {
            console.error('Error fetching book details:', error);
            return;
          }

          if (data) {
            setBookDetails(data);
            const savedCurrentPage = localStorage.getItem(`currentPage_${bookId}`);
            setCurrentPage(savedCurrentPage ? Number(savedCurrentPage) : data.current_page || 0);

            // Fetch summary and page count from Google Books API using ISBN
            const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${data.isbn}`;
            const summaryResponse = await axios.get(googleBooksUrl);

            if (summaryResponse.data.items && summaryResponse.data.items.length > 0) {
              const bookInfo = summaryResponse.data.items[0].volumeInfo;
              setSummary(bookInfo.description || 'No summary available');
              setPageCount(bookInfo.pageCount || 0); // Set the page count from Google Books API
            }
          }
        } catch (error) {
          console.error('Error fetching book data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleReadingStateChange = async (state: 'Reading' | 'Finished') => {
    setReadingState(state);
    if (state === 'Finished') {
      setCurrentPage(pageCount);
    }

    try {
      await supabase
        .from('reading_list')
        .update({ reading_state: state, current_page: state === 'Finished' ? pageCount : currentPage })
        .eq('book_id', bookId);

      // Store the current page in local storage
      localStorage.setItem(`currentPage_${bookId}`, currentPage.toString());
    } catch (err) {
      console.error('Error updating reading state:', err);
    }
  };

  const handlePageUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value, 10);
    if (page > 0 && page <= pageCount) {
      setCurrentPage(page);

      // Store the current page in local storage
      localStorage.setItem(`currentPage_${bookId}`, page.toString());

      try {
        await supabase
          .from('reading_list')
          .update({ current_page: page })
          .eq('book_id', bookId);
      } catch (err) {
        console.error('Error updating current page:', err);
      }
    }
  };

  const calculateProgress = () => {
    return pageCount > 0 ? ((currentPage / pageCount) * 100).toFixed(2) : '0.00';
  };

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (!bookDetails) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <div className="flex items-start space-x-6">
        <img
          src={bookDetails.image}
          alt={bookDetails.title}
          className="w-48 h-64 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-black mb-4">{bookDetails.title}</h1>
          <p className="text-lg text-gray-600 mb-2"><strong>Author:</strong> {bookDetails.author}</p>
          <p className="text-lg text-gray-600 mb-2"><strong>Genre:</strong> {bookDetails.genre || 'Unknown'}</p>
          <p className="text-lg text-gray-600 mb-2"><strong>Published:</strong> {new Date(bookDetails.publication_date).toLocaleDateString()}</p>
          
          {/* Summary */}
          <div className="my-4">
            <h2 className="text-xl font-semibold text-black">Summary</h2>
            <p className="text-gray-600">{summary}</p>
          </div>

          {/* Reading State with Icons */}
          <div className="my-4 flex items-center">
            <h2 className="text-xl font-semibold text-black mr-4">Reading Status</h2>
            <FaBookOpen 
              onClick={() => handleReadingStateChange('Reading')}
              className={`text-2xl cursor-pointer ${readingState === 'Reading' ? 'text-black' : 'text-gray-500'}`}
              title="Mark as Reading"
            />
            <FaCheckCircle 
              onClick={() => handleReadingStateChange('Finished')}
              className={`text-2xl cursor-pointer ml-4 ${readingState === 'Finished' ? 'text-black' : 'text-gray-500'}`}
              title="Mark as Finished"
            />
          </div>

          {/* Page Tracker */}
          {readingState === 'Reading' && (
            <div className="my-6">
              <h2 className="text-xl font-semibold text-black">Track Your Progress</h2>
              <p className="text-sm text-gray-600">Current Page: {currentPage} / {pageCount}</p>
              <input
                type="number"
                value={currentPage}
                min={1}
                max={pageCount}
                onChange={handlePageUpdate}
                className="border border-gray-400 rounded p-2 my-2 w-20"
              />
              <p className="text-sm text-gray-600 mt-2">Progress: {calculateProgress()}%</p>
            </div>
          )}

          {/* Finished Status */}
          {readingState === 'Finished' && (
            <p className="text-xl font-bold text-green-600">You have finished reading this book!</p>
          )}

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-black text-white rounded-md mt-4"
          >
            Back to Reading List
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
