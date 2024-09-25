'use client';
import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';
import { IPasswords } from '../types/links';

export default function SingIn() {
  const [isPasswordVissible, setIsPasswordVissible] =
    React.useState<boolean>(false);
  const [isRepeatedPasswordVissible, setIsRepeatedPasswordVissible] =
    React.useState<boolean>(false);

  const [passwords, setPasswords] = React.useState<IPasswords>({
    password: '',
    repeatedPassword: '',
  });

  const passwordsAreNotTheSameError = () => {
    if (
      passwords.password !== passwords.repeatedPassword ||
      passwords.password === ''
    ) {
      Swal.fire({
        title: 'Error!',
        text: 'The passwords you entered do not match...',
        icon: 'error',
        confirmButtonText: 'Try one more time',
      });
      return;
    }

    Swal.fire({
      title: 'Great!',
      text: 'Account has been created! You will be redirected to the home page after a few seconds...',
      icon: 'success',
      confirmButtonText: 'Got it!',
    });

    //Request on server
  };

  const handlePasswords = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className=' w-full flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col md:w-1/3 w-11/12'>
        <h1 className=' text-3xl font-bold text-left w-full mb-5'>
          Create an account 🏁
        </h1>
        <p className='text-left w-full'>We are glad to see you here,</p>
        <p className=' text-left w-full'>
          let's start by creating your account!
        </p>

        <div className='flex flex-col w-full gap-2 mt-8'>
          <label htmlFor='name'>Full name</label>
          <input
            className=' rounded-md border bg-[#E7F0FF] px-6 py-3 focus:outline-none'
            name='name'
            type='text'
            placeholder='John Doe'
          />
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
              onChange={(e) => handlePasswords(e)}
            />
            <button
              className='text-xl mr-2 bg-[#E7F0FF]'
              onClick={() => setIsPasswordVissible((prev) => !prev)}
            >
              {isPasswordVissible ? '🐵' : '🙈'}
            </button>
          </div>
          <label htmlFor='repeatedPassword'>Repeat your password</label>
          <div className='flex w-full justify-between rounded-md border bg-[#E7F0FF] '>
            <input
              className='bg-[#E7F0FF] h-full w-11/12 px-6 py-3 focus:outline-none'
              name='repeatedPassword'
              type={isRepeatedPasswordVissible ? 'text' : 'password'}
              placeholder='At least 8 characters'
              onChange={(e) => handlePasswords(e)}
            />
            <button
              className='text-xl mr-2 bg-[#E7F0FF]'
              onClick={() => setIsRepeatedPasswordVissible((prev) => !prev)}
            >
              {isRepeatedPasswordVissible ? '🐵' : '🙈'}
            </button>
          </div>
          <button
            onClick={passwordsAreNotTheSameError}
            className='rounded-md bg-[#0E2D3B] active:bg-[#0c2531] hover:bg-[#133c4f] text-white py-3 mt-8'
          >
            Sign Up
          </button>
        </div>
        <p className='text-center mt-2'>
          Do you have already an account?{' '}
          <Link className='text-blue-500 text-right underline' href='/sign-in'>
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
