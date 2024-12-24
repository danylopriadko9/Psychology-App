'use client';
import Link from 'next/link';
import React from 'react';
import InputElement from '../Components/InputElement';
import PasswordCompare from '../Components/PasswordsCompare';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { IData } from '../types/data';
import { axiosInstance } from '../utilities/axiosInstance';

export default function SingIn() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeated, setPasswordRepeated] = React.useState('');

  const handleButton = async () => {
    try {
      await axiosInstance.post(`/auth/sign-up`, {
        name,
        email,
        password,
        passwordRepeated,
      });
      router.push('/email-code-check');
    } catch (error) {
      const e = error as AxiosError;
      const res = e.response?.data as IData;
      Swal.fire({
        title: 'Error!',
        text: res.message.replace('Error: ', ''),
        icon: 'error',
        confirmButtonText: 'Got it',
      });
    }
  };

  return (
    <main className=' w-full flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col w-full'>
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
            password={password}
            setPassword={setPassword}
            passwordRepeated={passwordRepeated}
            setPasswordRepeated={setPasswordRepeated}
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
