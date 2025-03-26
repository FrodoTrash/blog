'use client';

import { useState } from 'react';
import { login, register } from '@/lib/actions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const {
    mutate: authMutate,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      if (isLogin) {
        return login(email, password);
      }
      return register(email, password);
    },
    onSuccess: () => {
      router.push('/dashboard');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authMutate();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        {isError && (
          <p className="text-red-500 text-sm">
            {error?.message || 'Authentication failed'}
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-sm text-blue-600 hover:underline w-full text-center"
      >
        {isLogin
          ? 'Need an account? Register'
          : 'Already have an account? Login'}
      </button>
    </div>
  );
}
