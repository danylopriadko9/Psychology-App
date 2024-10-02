'use client';
import Link from 'next/link';
import React from 'react';
import InputElement from '../Components/InputElement';
import PasswordCompare from '../Components/PasswordsCompare';
import { useRouter } from 'next/navigation';

export default function SingIn() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleButton = () => {
    console.log('sddsds');
    router.push('/email-code-check');
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
          <PasswordCompare
            buttonTitle='Sign up'
            buttonFunction={handleButton}
            successPopUpMessage='Account has been created! You will be redirected to the home page after a few seconds...'
            errorPopUpMessage='The passwords you entered do not match...'
            errorFunction={() => {}}
            successButtonTitle='Got it'
            errorButtonTitle='Try one more time'
            //Maybe also I will need to add props such as name, email or userId
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
