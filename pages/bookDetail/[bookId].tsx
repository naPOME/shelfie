import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

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
    <div className="p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">{bookDetails.title}</h1>
      
      <img
        src={bookDetails.image} // The book cover image
        alt={bookDetails.title}
        className="mb-4 w-1/3 object-cover rounded"
      />

      {/* Author and Genre Information */}
      <p className="mb-2 text-gray-600"><strong>Author:</strong> {bookDetails.author}</p>
      <p className="mb-2 text-gray-600"><strong>Genre:</strong> {bookDetails.genre || 'Unknown'}</p>

      {/* Publication Date */}
      <p className="mb-2 text-gray-600"><strong>Published on:</strong> {new Date(bookDetails.publication_date).toLocaleDateString()}</p>

      {/* Description */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-800">{bookDetails.description}</p>
      </div>

      {/* Reading Progress */}
      {bookDetails.progress_percentage && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Reading Progress</h2>
          <p className="text-sm text-gray-600">Progress: {bookDetails.progress_percentage}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${bookDetails.progress_percentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Reading List
      </button>
    </div>
  );
};

export default BookDetail;
