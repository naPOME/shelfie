'use client'
import AuthForm from "@/app/components/authForm";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { supabase } from '../../lib/supabaseClient'; 

const SignUpPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (email: string, password: string) => {
    setError(null); 
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        
        router.push('/'); 
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <AuthForm type="signup" onSubmit={handleSignUp} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </>
  );
};

export default SignUpPage;
