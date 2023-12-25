"use client"
import { trpc } from '@/app/_trpc/client';
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { mutate } = trpc.login.useMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email, password })
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
