'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import NavBar from './components/common/navBar'; // Path to NavBar component
import { ProfileDetail } from './components/common/profileDetail';
import AuthChecker from './AuthChecker'; // Path to AuthChecker component
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname(); // Get the current route

  // Toggle profile detail visibility
  const handleProfileClick = () => {
    setShowProfile((prev) => !prev);
  };

 
  const hideNavBarRoutes = ['/sign-in', '/sign-up'];


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