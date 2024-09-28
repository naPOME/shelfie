import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import '/home/pom/Shelfie/shelfie/styles/globals.css';

const BookDetail = () => {
  const router = useRouter();
  const { bookId } = router.query; // Get the bookId from the route
  const [bookDetails, setBookDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (bookId) { // Ensure bookId is available
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from('reading_list') // Assuming `reading_list` contains the book data
            .select('*')
            .eq('book_id', bookId) // Fetch details for the specific book
            .single(); // Expect a single record

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
    return <p>Loading book details...</p>;
  }

  if (!bookDetails) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white p-10 flex flex-col items-center">
      {/* Hero Section with book cover and title */}
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        
        <div className="md:w-1/3">
          <img
            src={bookDetails.image} // The book cover image
            alt={bookDetails.title}
            className="object-cover h-full w-full"
          />
        </div>

        <div className="md:w-2/3 p-6">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4">{bookDetails.title}</h1>
          
          {/* Author and Genre */}
          <p className="text-lg text-gray-800 mb-2"><strong>Author:</strong> {bookDetails.author}</p>
          <p className="text-lg text-gray-800 mb-4"><strong>Genre:</strong> {bookDetails.genre || 'Unknown'}</p>

          {/* Publication Date */}
          <p className="text-sm text-gray-500 mb-4">
            Published on: {new Date(bookDetails.publication_date).toLocaleDateString()}
          </p>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Overview</h2>
            <p className="text-gray-700">{bookDetails.description}</p>
          </div>

          {/* Reading Progress */}
          {bookDetails.progress_percentage && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Your Reading Progress</h2>
              <p className="text-sm text-gray-600 mb-2">Progress: {bookDetails.progress_percentage}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${bookDetails.progress_percentage}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
              Continue Reading
            </button>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300"
            >
              Back to Reading List
            </button>
          </div>
        </div>
      </div>

      {/* Additional Section: Suggested Books or Reviews */}
      <div className="mt-12 w-full max-w-5xl">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">You Might Also Like</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Suggested books or recommendations could go here */}
          <div className="p-4 bg-white shadow-lg rounded-lg">Suggested Book 1</div>
          <div className="p-4 bg-white shadow-lg rounded-lg">Suggested Book 2</div>
          <div className="p-4 bg-white shadow-lg rounded-lg">Suggested Book 3</div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
