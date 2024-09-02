
// components/AuthForm.tsx
// components/AuthForm.tsx
import { useState } from 'react';

import ConfettiBackground from './confetiBackground';
import BookAnimation from './bookParticles';


interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-100">
     

      {/* Form */}
      <div className="relative z-10 w-full max-w-md">
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg">
        <BookAnimation/>
          <h2 className="text-2xl font-bold mb-6 text-center">{type === 'login' ? 'Sign In' : 'Sign Up'}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
          >
            {type === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
