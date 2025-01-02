'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import NavBar from './components/common/navBar'; 
import { ProfileDetail } from './components/common/profileDetail';
import AuthChecker from './AuthChecker'; 
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname(); 

  const handleProfileClick = () => {
    setShowProfile((prev) => !prev);
  };


  const hideNavBarRoutes = ['/auth/sign-in', '/auth/sign-up'];


  const shouldShowNavBar = !hideNavBarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
    
        <AuthChecker />

        {shouldShowNavBar && <NavBar showProfile={handleProfileClick} />}

        {showProfile && <ProfileDetail />}
        <main>{children}</main>
      </body>
    </html>
  );
}