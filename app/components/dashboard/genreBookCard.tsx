import React from 'react';

const Sidebar = ({ onGenreSelect }) => {
  const genres = ['Fiction', 'Non-fiction', 'Mystery', 'Science Fiction', 'Fantasy']; // Sample genres

  return (
    <aside className="w-64 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Genres</h2>
      <ul className="space-y-4">
        {genres.map((genre) => (
          <li key={genre}>
            <button
              className="w-full py-3 px-4 text-left bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => onGenreSelect(genre)} // Call the function when genre is selected
            >
              {genre}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
