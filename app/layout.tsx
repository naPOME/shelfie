'use client'
import { useState } from 'react';
import NavBar from './components/common/navBar';  // Path to NavBar component
import { ProfileDetail } from './components/common/profileDetail';
import '../styles/globals.css';
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(prev => !prev); 

  };

  return (
    <html lang="en">
      <body>
        <NavBar showProfile={handleProfileClick} />  
          {showProfile && <ProfileDetail/>}
        <main>
          {children}
        </main>  
      </body>
    </html>
  );
}
