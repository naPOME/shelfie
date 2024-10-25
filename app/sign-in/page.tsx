'use client'
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient'; 
import AuthForm from '@/app/components/authForm';

const SignInPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter(); 

  
  const handleSignIn = async (email: string, password: string) => {
    setError(null);
    try {
      console.log('Attempting to log in with:', email, password);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
  
      if (error) {
        console.error('Login failed:', error.message);
        setError(error.message);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };
  
  return (
    <>
      
      <AuthForm type="login" onSubmit={handleSignIn} />

      
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </>
  );
};

export default SignInPage;
