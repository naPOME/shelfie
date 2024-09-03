'use client'
import React from 'react';
import GenreBookCard from '../common/genreCard';

const genresData = [
  { id: '1', genre: 'Fantasy', image: 'https://imgs.search.brave.com/J3iD3zTCLscjExIFo0CPbwgyQ-xnWfjrIg022hEnQnw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI4/MjMzNjkwMi9waG90/by9mYW50YXN5LWlt/YWdlLXdoZXJlLXNv/bWVvbmUtY29tZXMt/b3V0LW9mLWEtYm9v/ay5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9SVBqcU1rZWs0/b1pEOE9aVXdad3dq/S0J5SWhMeGF2dlVY/bklMZjdHZE5Pbz0' },
  { id: '2', genre: 'Sci-Fi', image: 'https://imgs.search.brave.com/DVST6_Uuymn0E6WED3LYLeUQOOGw9I1lrslUaixexyE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzkxeldyTHlWRXlM/LmpwZw' },
  { id: '3', genre: 'Mystery', image: 'https://imgs.search.brave.com/ITkPHp48YPlvK1aT-X4YIdSyfA1rODye2lRGcckag-c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGVuZ3VpbnJh/bmRvbWhvdXNlLmNv/bS9jb3Zlci85Nzgx/NTc1NjU4NjY3' },
  { id: '4', genre: 'Romance', image: '/img/romance.jpg' },
  { id: '5', genre: 'Horror', image: '/img/horror.jpg' },
  { id: '6', genre: 'Non-Fiction', image: '/img/nonfiction.jpg' },
];

const BottomGenreSection: React.FC = () => {
  const handleGenreClick = (id: string) => {
    alert(`Genre with ID: ${id} selected!`);
  };

  return (
    <div className=" bottom-0 left-0 right-0 bg-gray-50 shadow-sm border-t-2 border-b-2 border-gray-300 pt-2">
      <div className="container mx-auto px-4 flex overflow-x-auto justify-center">
        {genresData.map((genre) => (
          <GenreBookCard
            key={genre.id}
            id={genre.id}
            genre={genre.genre}
            image={genre.image}
            onClick={handleGenreClick}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomGenreSection;
