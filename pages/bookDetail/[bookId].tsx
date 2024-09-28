import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const BookDetail = () => {
  const router = useRouter();
  const { bookId } = router.query;
  const [bookDetails, setBookDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (bookId) {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from('reading_list') // Assuming the table name is 'reading_list'
            .select('*')
            .eq('book_id', bookId)
            .single();

          if (error) {
            console.error('Error fetching book details:', error);
          } else {
            setBookDetails(data);
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

  if (loading) {
    return <p className="text-white">Loading book details...</p>;
  }

  if (!bookDetails) {
    return <p className="text-white">Book not found.</p>;
  }

  return (
    <div className="min-h-screen bg-black p-10 flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        
        <div className="md:w-1/3">
          <img
            src={bookDetails.image} // Replace with higher-quality image if available
            alt={bookDetails.title}
            className="object-cover h-full w-full"
            style={{ filter: 'brightness(0.9)' }} // Slightly enhance brightness for better visibility
          />
        </div>

        <div className="md:w-2/3 p-6">
          <h1 className="text-4xl font-extrabold text-white mb-4">{bookDetails.title}</h1>
          
          {/* Author and Genre */}
          <p className="text-lg text-gray-400 mb-2"><strong>Author:</strong> {bookDetails.author}</p>
          <p className="text-lg text-gray-400 mb-4"><strong>Genre:</strong> {bookDetails.genre || 'Unknown'}</p>

          {/* Publication Date */}
          <p className="text-sm text-gray-500 mb-4">
            Published on: {new Date(bookDetails.publication_date).toLocaleDateString()}
          </p>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Overview</h2>
            <p className="text-gray-300">{bookDetails.description}</p>
          </div>

          {/* Reading Progress */}
          {bookDetails.progress_percentage && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Your Reading Progress</h2>
              <p className="text-sm text-gray-500 mb-2">Progress: {bookDetails.progress_percentage}%</p>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gray-300 h-2.5 rounded-full"
                  style={{ width: `${bookDetails.progress_percentage}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-300">
              Continue Reading
            </button>
            <button
              onClick={() => router.back()}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-500"
            >
              Back to Reading List
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Books Section */}
      <div className="mt-12 w-full max-w-5xl">
        <h3 className="text-2xl font-semibold text-gray-200 mb-4">You Might Also Like</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Suggested books - placeholders */}
          <div className="p-4 bg-gray-800 text-white shadow-lg rounded-lg">Suggested Book 1</div>
          <div className="p-4 bg-gray-800 text-white shadow-lg rounded-lg">Suggested Book 2</div>
          <div className="p-4 bg-gray-800 text-white shadow-lg rounded-lg">Suggested Book 3</div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
