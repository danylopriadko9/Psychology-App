'use client';
import Link from 'next/link';
import React from 'react';

export default function SingIn() {
  const [isPasswordVissible, setIsPasswordVissible] = React.useState(false);
  return (
    <main className=' flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col'>
        <h1 className=' text-3xl font-bold text-left w-full mb-5'>
          Welcome Back 👋
        </h1>
        <p className='text-left w-full'>
          Today is a new day. It's your day. You shape it.
        </p>
        <p className=' text-left w-full'>
          Sign in to start managing your projects.{' '}
        </p>

        <div className='flex flex-col w-full gap-2 mt-8'>
          <label htmlFor='email'>Email</label>
          <input
            className=' rounded-md border bg-[#E7F0FF] px-6 py-3 focus:outline-none'
            name='email'
            type='text'
            placeholder='example@gmail.com'
          />
          <label htmlFor='password'>Password</label>
          <div className='flex w-full justify-between rounded-md border bg-[#E7F0FF] '>
            <input
              className='bg-[#E7F0FF] h-full w-11/12 px-6 py-3 focus:outline-none'
              name='password'
              type={isPasswordVissible ? 'text' : 'password'}
              placeholder='At least 8 characters'
            />
            <button
              className='text-xl mr-2 bg-[#E7F0FF]'
              onClick={() => setIsPasswordVissible((prev) => !prev)}
            >
              {isPasswordVissible ? '🐵' : '🙈'}
            </button>
          </div>
          <Link
            className='text-blue-500 text-right underline'
            href='/reset-password'
          >
            Forgot password?
          </Link>
          <button className='rounded-md bg-[#0E2D3B] active:bg-[#0c2531] hover:bg-[#133c4f] text-white py-3 mt-8'>
            Sign In
          </button>
        </div>
        <p className='text-center mt-2'>
          Do not you have an account?{' '}
          <Link className='text-blue-500 text-right underline' href='/sign-up'>
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
