'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthChecker = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      router.push('/sign-in');
    }
  }, [router]);

  return null;
};

export default AuthChecker;