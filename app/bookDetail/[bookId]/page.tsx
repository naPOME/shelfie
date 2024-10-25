'use client'
// app/bookDetail/[bookId]/page.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Still needed for navigation, but not for params
import { supabase } from '@/lib/supabaseClient';
import { FaBookOpen, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { AiOutlineRobot } from 'react-icons/ai';
import   myimage from '/home/pom/shelfie/shelfie/app/google-gemini-ico.svg';


const BookDetail = ({ params }) => {
  const { bookId } = params; // Access bookId from params
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!bookId) return;

      const { data, error } = await supabase
        .from('reading_list')
        .select('*')
        .eq('book_id', bookId)
        .single();

      if (error) {
        console.error('Error fetching book details:', error);
      } else {
        setBookDetails(data);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const updateBookStatus = async (status) => {
    if (!bookDetails?.book_id) return;
    try {
      const { error } = await supabase
        .from('reading_list')
        .update({ status })
        .eq('book_id', bookDetails.book_id);

      if (error) {
        console.error('Error updating book status:', error);
      } else {
        // Update the book status in your state or UI as needed
      }
    } catch (error) {
      console.error('Error occurred while updating book status:', error);
    }
  };

  if (!bookDetails) {
    return <p className="text-gray-500">Book not found.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-gray-200 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        {/* Back Button */}
        <div className="flex justify-start mb-4">
          <button
            onClick={() => window.history.back()}
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
              {bookDetails.status !== 'reading' && bookDetails.status !== 'finished' && (
                <div className='flex gap-10'>
                <button
                  onClick={() => updateBookStatus('reading')}
                  className="flex items-center justify-center p-2 rounded-full border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  <FaBookOpen size={20} className='text-black' />
                </button>
                <img src="https://cdn0.iconfinder.com/data/icons/artificial-intelligence-39/64/brain-artificial-intelligence-ai-brainstorming-64.png" className='border rounded-full flex items-center justify-center p-2 rounded-full border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white transition-colors  border-black h-10 w-10 p-2' alt="" />
                </div>
              )}

              {/* Mark as Finished Button */}
              {bookDetails.status === 'reading' && (
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
