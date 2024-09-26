'use client';
import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';
import PasswordInput from '../Components/PasswordInput';
import ButtonElement from '../Components/ButtonElement';
import InputElement from '../Components/InputElement';

export default function SingIn() {
  const [password, setPassword] = React.useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = React.useState<string>('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const passwordsAreNotTheSameError = () => {
    if (password !== repeatedPassword || password === '') {
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

        <div className='flex flex-col w-full gap-3 mt-8'>
          <InputElement
            labelTitle='Full name'
            name='name'
            placeholder='John Doe'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
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
            labelTitle='Password'
            placeholder='At least 8 characters'
          />
          <PasswordInput
            type='repeatedPassword'
            value={repeatedPassword}
            handleChange={(e) => setRepeatedPassword(e.target.value)}
            labelTitle='Repeat your password'
            placeholder='Repeat your password here...'
          />
          <ButtonElement
            title='Sign Up'
            handleClick={passwordsAreNotTheSameError}
          />
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
