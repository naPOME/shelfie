'use client';
import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaBookmark } from 'react-icons/fa';

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string | null;
  genre?: string | null; // Optional
  published_date?: string | null; // Optional
  pageCount?: number | null; // Optional
};

const BookCard: React.FC<BookCardProps> = ({ id, title, author, image, description, genre,published_date,pageCount}) => {
  // Define a type for BookData
  type BookData = {
    user_id: string;
    book_id: string;
    title: string;
    author: string;
    image: string;
    description: string | null;
    genre?: string | null;
     published_date?: string | null;
     pageCount?: number | null;
  };

  const handleAddToReadingList = async () => {
    const { data, error: userError } = await supabase.auth.getUser();
    
    if (userError || !data.user) {
      console.error('Error fetching user or user not logged in:', userError);
      alert('Please log in to add books to your reading list.');
      return;
    }

    const user = data.user;

    // Check if the book is already in the reading list
    const { data: existingBooks, error: fetchError } = await supabase
      .from('reading_list')
      .select('id')
      .eq('user_id', user.id)
      .eq('book_id', id);

    if (fetchError) {
      console.error('Error fetching reading list:', fetchError);
      return;
    }

    if (existingBooks && existingBooks.length > 0) {
      alert('This book is already in your reading list.');
      return;
    }

    // Prepare data for insertion
    const bookData: BookData = {
      user_id: user.id,
      book_id: id,
      title: title || 'Untitled',
      author: author || 'Unknown Author',
      image: image || '/path/to/default-image.jpg',
      description: description !== null ? description : null, // Ensure it's set correctly
      genre: genre || null,
      published_date: published_date || null,
      pageCount: pageCount || null,
    };
    console.log('Final data prepared for insertion:', bookData);

    // Insert into reading_list
    const { error } = await supabase.from('reading_list').insert(bookData);

    if (error) {
      console.error('Error adding book to reading list:', error.message);
      console.error('Attempted to insert:', bookData);
      alert('There was an issue adding the book to your reading list. Check console for more details.');
    } else {
      alert('Book added to your reading list!');
    }
  };

  return (
    <div className="bg-transparent border-b-8 border min-w-48 max-w-56 rounded-lg p-4 flex flex-col h-full hover:bg-slate-100">
      <img src={image} alt={title} className="w-full h-72 object-cover rounded-md" />
      <div className="mt-4 flex-1">
        <h3 className="text-lg font-bold text-black truncate text-center">{title}</h3>
        <p className="text-gray-600 truncate text-center">{author}</p>
        <button
          onClick={handleAddToReadingList}
          className="mt-4 bg-black text-white py-2 px-4 text-xs rounded hover:bg-gray-800 flex items-center justify-center ml-4"
        >
          <FaBookmark className='h-3 w-3 mr-2' />
          Add to Reading List
        </button>
      </div>
    </div>
  );
};

export default BookCard;
