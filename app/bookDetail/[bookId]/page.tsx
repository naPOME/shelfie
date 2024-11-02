'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { FaBookOpen, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import myImage from '/home/pom/shelfie/shelfie/public/images/ai.png';

const BookDetail = ({ params }) => {
  const { bookId } = params;
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
    setLoading(true); 
    try {
      const { error } = await supabase
        .from('reading_list')
        .update({ status })
        .eq('book_id', bookDetails.book_id);

      if (error) {
        console.error('Error updating book status:', error);
        setMessage('Failed to update book status.'); 
      } else {
        setMessage(`Book marked as ${status}.`); 
        
        fetchBookDetails(); 
      }
    } catch (error) {
      console.error('Error occurred while updating book status:', error);
      setMessage('An error occurred while updating the status.'); 
    } finally {
      setLoading(false); 
    }
  };

  if (!bookDetails) {
    return <p className="text-gray-500">Book not found.</p>;
  }

  return (
    <div className="max-h-screen flex items-center font-mono justify-center  p-6 w-full">
      <div className="p-8 absolute top-20"> 
        {/* Back Button */}
        <div className="flex justify-start mb-4 ">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to List
          </button>
        </div>

        {/* Book Details Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Book Image */}
          <div className="w-1/4  mb-6 md:mb-0">
            <img
              src={bookDetails.image}
              alt={bookDetails.title}
              className="w-full h-full rounded-md border border-gray-300 shadow-md object-cover"
            />
          </div>

          {/* Book Info Section */}
          <div className="md:w-2/3 md:pl-6">
            <h1 className="text-4xl font-semibold text-gray-800 mb-2">{bookDetails.title}</h1>
            <p className="text-lg text-gray-900 mb-2">
              <strong className='text-sm'>Author:</strong> {bookDetails.author}
            </p>
            <p className="text-gray-700 mb-4">
              <strong className='text-sm'>Published:</strong> {new Date(bookDetails.published_date).toLocaleDateString()}
            </p>

            {/* Additional Book Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <p className="text-gray-900">
                <strong className='text-sm'>Genre:</strong> {bookDetails.genre || 'Not Available'}
              </p>
              <p className="text-gray-900">
                <strong className='text-sm'>Page Count:</strong> {bookDetails.pageCount || 'Not Available'}
              </p>
              <p className="text-gray-900">
                <strong className='text-sm'>Language:</strong> {bookDetails.language || 'Not Available'}
              </p>
              <p className="text-gray-900">
                <strong className='text-sm'>Rating:</strong> {bookDetails.rating || 'Not Available'}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-900 leading-relaxed text-sm text-justify text-pretty">
                <strong>Description:</strong> {bookDetails.description || 'Not Available'}
              </p>
            </div>

            {/* Status Buttons */}
            <div className="flex space-x-4">
              {/* Mark as Reading Button */}
              {bookDetails.status !== 'reading' && bookDetails.status !== 'finished' && (
                <div className='flex gap-4'>
                  <button
                    onClick={() => updateBookStatus('reading')}
                    className="flex items-center justify-center p-2 rounded-lg border transition-colors"
                  >
                    <FaBookOpen size={20} title='Mark as Reading' className='text-black bg-white hover:text-white hover:bg-black ' />
                  </button>

                  <Image 
                    src={myImage}
                    alt='logog'
                    className='flex items-center justify-center border rounded-lg hover:border-gray-700 h-10 w-10 p-1'
                    title='Summarize'
                  />
                </div>
              )}

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

            
            {loading && <p className="text-gray-500">Updating...</p>}
            {message && <p className="text-green-500">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
