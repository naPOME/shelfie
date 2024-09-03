import React from 'react';

type GenreBookCardProps = {
  id: string;
  genre: string;
  image: string;
  onClick: (id: string) => void;
};

const GenreBookCard: React.FC<GenreBookCardProps> = ({ id, genre, image, onClick }) => {
  return (
    <div
      className="min-w-[60px] max-w-[70px] cursor-pointer mx-2"
      onClick={() => onClick(id)}
    >
      <img
        src={image}
        alt={genre}
        className="w-full h-14 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300"
      />
      <p className="text-center mt-2 text-xs text-gray-700 font-semibold">{genre}</p>
    </div>
  );
};

export default GenreBookCard;
