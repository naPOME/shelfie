import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaBookOpen, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const BookDetail = () => {
  const router = useRouter();
  const { bookId } = router.query; // Ensure bookId is coming from the URL
  const [bookDetails, setBookDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookStatus, setBookStatus] = useState<string>(''); 

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
            setBookStatus(data.status); 
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

  const updateBookStatus = async (status: string) => {
    if (!bookId) return; // Guard clause to prevent updates if bookId is undefined
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-gray-200 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        {/* Back Button */}
        <div className="flex justify-start mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
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
              className="w-full h-full rounded-md border border-gray-300 shadow-md object-cover"
            />
          </div>

          {/* Book Info */}
          <div className="md:ml-6 flex-1">
            <h1 className="text-4xl font-semibold text-gray-800 mb-2">{bookDetails.title}</h1>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Author:</strong> {bookDetails.author}
            </p>
            <p className="text-gray-500 mb-4">
              <strong>Published:</strong> {new Date(bookDetails.publication_date).toLocaleDateString()}
            </p>

            {/* Additional Book Information */}
            <p className="text-gray-600 mb-2">
              <strong>Genre:</strong> {bookDetails.genre || 'Not Available'}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Page Count:</strong> {bookDetails.page_count || 'Not Available'}
            </p>
            <p className="text-gray-600 mb-6">
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
                  className="flex items-center justify-center p-2 rounded-full border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
                  title="Mark as Reading"
                >
                  <FaBookOpen size={20} />
                </button>
              )}

              {/* Mark as Finished Button */}
              {bookStatus === 'reading' && (
                <button
                  onClick={() => updateBookStatus('finished')}
                  className="flex items-center justify-center p-2 rounded-full border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
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
