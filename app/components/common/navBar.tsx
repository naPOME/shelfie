import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-gray-50 rounded-t-lg shadow-md font-sans border-b-2 border-gray-300">
      {/* Logo */}
      <div className='flex flex-center space-x-'>
<img src="https://cdn0.iconfinder.com/data/icons/education-illustration-pack/128/Bookshelf-256.png" className='h-5 w-5' alt="" />
      <h1 className="text-2xl text-black font-medium ">SHELFie</h1>
      </div>
        
      {/* Search and Links */}
      <div className="flex items-center space-x-8">
        {/* Search */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="ml-3 outline-none bg-transparent placeholder-gray-500 text-sm text-gray-700"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6 text-sm font-medium text-black">
          <li><a href="#" className="hover:text-gray-900">Home</a></li>
          <li><a href="#" className="hover:text-gray-900">Books</a></li>
          <li><a href="#" className="hover:text-gray-900">Clubs</a></li>
          <li><a href="#" className="hover:text-gray-900">Events</a></li>
          <li><a href="#" className="hover:text-gray-900">Contact</a></li>
        </ul>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        {/* Book Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black hover:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>

        {/* Notification Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black hover:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        {/* Profile Image */}
        <div className="relative ">
          <img
            src="https://imgs.search.brave.com/tQkTE5Dq3xdwsKIJ-P9ndgrKhLv8_HzzLhjcOD7XoKw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzZXQuY29t/L3cvZnVsbC8wLzYv/ZS8xMDE3NTkuanBn"
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-200 object-cover cursor-pointer"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-1 -right-1 h-4 w-4 bg-white text-gray-800 rounded-full  border border-gray-200 p-0.5 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414L10 13.414l-4.707-4.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          
        </div>
        <div className='border-l-2 border-gray-500 h-10 '>
<p className='text-sm font-bold text-gray-800 pt-2 pl-2'>Sign in</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
