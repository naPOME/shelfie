
import React, { useState } from 'react';
import { FaBookmark, FaEye } from 'react-icons/fa';

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  image: string;
  onAddToReadingList: (id: string) => void;
};


const BookCard: React.FC<BookCardProps> = ({ id, title, author, image, onAddToReadingList }) => {
  return (
    <div className="bg-transparent min-w-48  max-w-56 rounded-lg p-4 flex flex-col h-full hover:bg-slate-100">
      
      <img src={image} alt={title} className="w-full h-72 object-cover rounded-md" />
    
      <div className="mt-4 flex-1">
        <h3 className="text-lg font-bold text-black truncate">{title}</h3>
        <p className="text-gray-600 truncate">{author}</p>
        <button
          onClick={() => onAddToReadingList(id)}
          className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 flex items-center justify-center"
        >
          <FaBookmark className='h-3 w-3' />
        </button>
    
      </div>
    </div>
  );
};

export default BookCard;
