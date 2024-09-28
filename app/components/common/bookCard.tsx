'use client';

import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaBookmark } from 'react-icons/fa';

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  image: string;
};

const BookCard: React.FC<BookCardProps> = ({ id, title, author, image }) => {
  const handleAddToReadingList = async () => {
    const { data, error: userError } = await supabase.auth.getUser();
    
    if (userError || !data.user) {
      console.error('Error fetching user or user not logged in:', userError);
      alert('Please log in to add books to your reading list.');
      return;
    }

    const user = data.user;

    const { error } = await supabase
      .from('reading_list')
      .insert({
        user_id: user.id, // Use user.id properly
        book_id: id,
        title,
        author,
        image,
      });

    if (error) {
      console.error('Error adding book to reading list:', error);
    } else {
      alert('Book added to your reading list!');
    }
  };

  return (
    <div className="bg-transparent border-b-8   border-black min-w-48 max-w-56 rounded-lg p-4 flex flex-col h-full hover:bg-slate-100">
      <img src={image} alt={title} className="w-full h-72 object-cover rounded-md" />
      <div className="mt-4 flex-1">
        <h3 className="text-lg font-bold text-black truncate">{title}</h3>
        <p className="text-gray-600 truncate">{author}</p>
        <button
          onClick={handleAddToReadingList}
          className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 flex items-center justify-center"
        >
          <FaBookmark className='h-3 w-3' />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
