'use client';
import Link from 'next/link';
import React from 'react';
import PasswordInput from '../Components/PasswordInput';
import ButtonElement from '../Components/ButtonElement';
import InputElement from '../Components/InputElement';

export default function SingIn() {
  const [password, setPassword] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');

  return (
    <main className=' flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col md:w-1/3 w-11/12'>
        <h1 className=' text-3xl font-bold text-left w-full mb-5'>
          Welcome Back 👋
        </h1>
        <p className='text-left w-full'>
          Today is a new day. It's your day. You shape it.
        </p>
        <p className=' text-left w-full'>
          Sign in to start managing your projects.{' '}
        </p>

        <div className='flex flex-col w-full gap-3 mt-8'>
          <InputElement
            labelTitle='Email'
            name='email'
            placeholder='example@gmail.com'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            type='password'
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            placeholder='At least 8 characters'
            labelTitle='Password'
          />
          <Link
            className='text-blue-500 text-right underline'
            href='/reset-password'
          >
            Forgot password?
          </Link>
          <ButtonElement title='Sign In' handleClick={() => {}} />
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
