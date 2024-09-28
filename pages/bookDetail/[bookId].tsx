

import '/home/pom/Shelfie/shelfie/styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import axios from 'axios';

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
          const { data, error } = await supabase
            .from('reading_list')
            .select('*')
            .eq('book_id', bookId)
            .single();

          if (error) {
            console.error('Error fetching book details:', error);
          } else {
            setBookDetails(data);
            setPageCount(data.page_count || 100);
            setCurrentPage(data.current_page || 0);
            setReadingState(data.reading_state || 'Not Started');
          }

          // Fetch summary from Google Books API using ISBN
          const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${data.isbn}`;
          const summaryResponse = await axios.get(googleBooksUrl);
          setSummary(summaryResponse.data.items[0]?.volumeInfo?.description || 'No summary available');
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
    if (state === 'Finished') setCurrentPage(pageCount);

    try {
      await supabase
        .from('reading_list')
        .update({ reading_state: state, current_page: state === 'Finished' ? pageCount : currentPage })
        .eq('book_id', bookId);
    } catch (err) {
      console.error('Error updating reading state:', err);
    }
  };

  const handlePageUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value, 10);
    if (page > 0 && page <= pageCount) {
      setCurrentPage(page);
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
    return ((currentPage / pageCount) * 100).toFixed(2);
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

          {/* Reading State */}
          <div className="my-4">
            <h2 className="text-xl font-semibold text-black">Reading Status</h2>
            <button
              onClick={() => handleReadingStateChange('Reading')}
              className={`px-4 py-2 mr-4 ${readingState === 'Reading' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-md`}
            >
              Mark as Reading
            </button>
            <button
              onClick={() => handleReadingStateChange('Finished')}
              className={`px-4 py-2 ${readingState === 'Finished' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-md`}
            >
              Mark as Finished
            </button>
          </div>

          {/* Page Tracker */}
          {readingState === 'Reading' && (
            <div className="my-6">
              <h2 className="text-xl font-semibold text-black">Track Your Progress</h2>
              <p className="text-sm text-gray-600">Current Page: {currentPage} / {pageCount}</p>
              <input
                type="range"
                value={currentPage}
                min={1}
                max={pageCount}
                onChange={handlePageUpdate}
                className="w-full my-2"
              />
              <div className="flex justify-between text-gray-600">
                <span>Page 1</span>
                <span>Page {pageCount}</span>
              </div>
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
