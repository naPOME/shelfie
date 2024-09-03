'use client'
import React from 'react';
import { useState } from 'react';
import GenreBookCard from '../common/genreCard';

const genresData = [
  { id: '1', genre: 'Fantasy', image: 'https://imgs.search.brave.com/J3iD3zTCLscjExIFo0CPbwgyQ-xnWfjrIg022hEnQnw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI4/MjMzNjkwMi9waG90/by9mYW50YXN5LWlt/YWdlLXdoZXJlLXNv/bWVvbmUtY29tZXMt/b3V0LW9mLWEtYm9v/ay5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9SVBqcU1rZWs0/b1pEOE9aVXdad3dq/S0J5SWhMeGF2dlVY/bklMZjdHZE5Pbz0' },
  { id: '2', genre: 'Sci-Fi', image: 'https://imgs.search.brave.com/DVST6_Uuymn0E6WED3LYLeUQOOGw9I1lrslUaixexyE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzkxeldyTHlWRXlM/LmpwZw' },
  { id: '3', genre: 'Mystery', image: 'https://imgs.search.brave.com/ITkPHp48YPlvK1aT-X4YIdSyfA1rODye2lRGcckag-c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGVuZ3VpbnJh/bmRvbWhvdXNlLmNv/bS9jb3Zlci85Nzgx/NTc1NjU4NjY3' },
  { id: '4', genre: 'Romance', image: 'https://imgs.search.brave.com/GOps4_tJ81OQpgotkpF07EbVFNHN56_jrb3GmtaOxdo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMyLnBlbmd1aW5y/YW5kb21ob3VzZS5j/b20vY292ZXIvOTc4/MDU5MzMzNjI0Mw' },
  { id: '5', genre: 'Horror', image: 'https://imgs.search.brave.com/zhxripBvXJIqNYhfoDtwjs3VJktcTpNcPP_Gu1yGQkE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2YzL2Rm/LzQwL2YzZGY0MDMz/Y2QwZDU3NjVhMGMx/YzVmZDYwYWU1NTQ4/LmpwZw' },
  { id: '6', genre: 'Non-Fiction', image: 'https://imgs.search.brave.com/CbpfsCol7r23R7Tehx6pXvObz_HvPTGZq7DFSKIafcA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxTjFILVJ4ZFBM/LmpwZw' },
];

const SidebarGenreSection: React.FC = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
  
    const handleGenreClick = (id: string) => {
      alert(`Genre with ID: ${id} selected!`);
    };
  
    const toggleSidebar = () => {
      setSidebarVisible(!isSidebarVisible);
    };
  
    return (
      <>
        <button
          onClick={toggleSidebar}
          className="fixed top-0 left-16 z-20 p-2 bg-transparent font-bold hover:bg-gray-100 rounded-r-lg focus:outline-none"
        >
          {isSidebarVisible ? '←' : '→'}
        </button>
  
        {isSidebarVisible && (
          <div className="fixed top-0 left-0 bottom-0 w-20 bg-transparent  py-4 z-10 transition-transform duration-300">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
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
        )}
      </>
    );
  };
  
  export default SidebarGenreSection;