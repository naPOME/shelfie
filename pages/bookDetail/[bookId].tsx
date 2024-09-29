

import '/home/pom/Shelfie/shelfie/styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaBookOpen, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const BookDetail = () => {
  const router = useRouter();
  const { bookId } = router.query;
  const [bookDetails, setBookDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookStatus, setBookStatus] = useState<string>(''); // Track book status

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
            setBookStatus(data.status); // Set current book status
          }
        } catch (error) {
          console.error('Error occurred while fetching book details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Update book status (reading or finished)
  const updateBookStatus = async (status: string) => {
    try {
      const { error } = await supabase
        .from('reading_list')
        .update({ status }) // Ensure 'status' column exists
        .eq('book_id', bookId);
  
      if (error) {
        console.error('Error updating book status:', error);
      } else {
        setBookStatus(status);
      }
    } catch (error) {
      console.error('Error occurred while updating book status:', error);
    }
  };
  
  if (loading) {
    return <p className="text-gray-500">Loading book details...</p>;
  }

  if (!bookDetails) {
    return <p className="text-gray-500">Book not found.</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-700 hover:text-black transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to List
          </button>
        </div>

        {/* Book Details */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
          {/* Book Image */}
          <div className="md:w-1/3 w-full mb-6 md:mb-0">
            <img
              src={bookDetails.image}
              alt={bookDetails.title}
              className="w-full h-auto rounded-md border border-gray-200 shadow"
            />
          </div>

          {/* Book Info */}
          <div className="md:ml-8 flex-1">
            <h1 className="text-3xl font-bold text-black mb-3">{bookDetails.title}</h1>
            <p className="text-gray-600 text-lg mb-2">
              <strong>Author:</strong> {bookDetails.author}
            </p>
            <p className="text-gray-500 text-lg mb-2">
              <strong>Published:</strong> {new Date(bookDetails.publication_date).toLocaleDateString()}
            </p>

            {/* Additional Book Information */}
            <p className="text-gray-600 text-lg mb-2">
              <strong>Genre:</strong> {bookDetails.genre || 'Not Available'}
            </p>
            <p className="text-gray-500 text-lg mb-2">
              <strong>Publisher:</strong> {bookDetails.publisher || 'Not Available'}
            </p>
            <p className="text-gray-500 text-lg mb-2">
              <strong>ISBN:</strong> {bookDetails.isbn || 'Not Available'}
            </p>
            <p className="text-gray-500 text-lg mb-2">
              <strong>Page Count:</strong> {bookDetails.page_count || 'Not Available'}
            </p>
            <p className="text-gray-500 text-lg mb-6">
              <strong>Language:</strong> {bookDetails.language || 'Not Available'}
            </p>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6">
              {bookDetails.description}
            </p>

            {/* Status Buttons */}
            <div className="flex space-x-4">
              {/* Mark as Reading Button */}
              {bookStatus !== 'reading' && bookStatus !== 'finished' && (
                <button
                  onClick={() => updateBookStatus('reading')}
                  className="p-2 rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                  title="Mark as Reading"
                >
                  <FaBookOpen size={20} />
                </button>
              )}

              {/* Mark as Finished Button */}
              {bookStatus === 'reading' && (
                <button
                  onClick={() => updateBookStatus('finished')}
                  className="p-2 rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                  title="Mark as Finished"
                >
                  <FaCheckCircle size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
