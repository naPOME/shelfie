import React from 'react';
import { FaBookmark, FaRedditAlien, FaShare, FaTelegram } from 'react-icons/fa';

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  image: string;
  onAddToReadingList: (id: string) => void;
};

const BookCard: React.FC<BookCardProps> = ({ id, title, author, image, onAddToReadingList }) => {
  return (
    <div className="bg-transparent min-w-48   rounded-lg p-4 ">
      <img src={image} alt={title} className="w-48 h-72  object-cover rounded-md" />
      <div className="mt-4 ">
        <h3 className="text-lg font-bold text-black ">{title}</h3>
        <p className="text-gray-600 ">{author}</p>
        <button
          onClick={() => onAddToReadingList(id)}
          className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800  "
        >
          <FaBookmark />
          
        </button>
       
        
      </div>
    </div>
  );
};

export default BookCard;
