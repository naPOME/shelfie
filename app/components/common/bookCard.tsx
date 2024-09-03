import React from 'react';

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  image: string;
  onAddToReadingList: (id: string) => void;
};

const BookCard: React.FC<BookCardProps> = ({ id, title, author, image, onAddToReadingList }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-filter duration-300" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-black">{title}</h3>
        <p className="text-gray-500">{author}</p>
        <button
          onClick={() => onAddToReadingList(id)}
          className="mt-4 px-4 py-2 w-full bg-white text-black border border-black rounded hover:bg-black hover:text-white transition-colors duration-300"
        >
          Add to Reading List
        </button>
      </div>
    </div>
  );
};

export default BookCard;
