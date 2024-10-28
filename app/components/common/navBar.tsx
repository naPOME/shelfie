'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import SearchComponent from './searchComponent';
import { usePathname } from 'next/navigation'; 
import { ProfileDetail } from './profileDetail';




const Navbar: React.FC<{ showProfile: () => void }> = ({ showProfile }) =>{
  const pathname = usePathname(); 
  

  
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Books', path: '/bookSection' },
    { label: 'Clubs', path: '/clubs' },
    { label: 'Events', path: '/events' },
    { label: 'Contact', path: '/contact' },
  ];
 

  
  const isSearchVisible = !['/', '/bookSection', '/bookCollection'].includes(pathname) && !pathname.startsWith('/bookDetail/');

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-gray-50 rounded-t-lg shadow-md font-sans border-b-2 border-gray-300">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="https://cdn0.iconfinder.com/data/icons/education-illustration-pack/128/Bookshelf-256.png" className="h-5 w-5" alt="Logo" />
        <h1 className="text-2xl text-black font-medium">SHELFie</h1>
      </div>

      {/* Conditionally render the Search Component */}
      {isSearchVisible && <SearchComponent />}

      {/* Navigation Links */}
      <ul className="flex items-center space-x-6 text-sm font-medium text-black">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
        {/* Profile Picture */}
        <li>
          <img src="https://i.pinimg.com/236x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg" alt="Profile" className="h-8 w-8 rounded-full " onClick={showProfile} />
        </li>
       
        <Link href="/bookCollection">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black hover:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </Link>
      </ul>
     
    </nav>
  );
};

export default Navbar;
