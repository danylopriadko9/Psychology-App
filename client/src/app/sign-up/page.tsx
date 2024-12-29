'use client';
//###############################################################
import React from 'react';
//============= COMPONENTS ===================
import InputElement from '../Components/InputElement';
import PasswordCompare from '../Components/PasswordsCompare';
//============= NAVIGATION ===================
import Link from 'next/link';
import { useRouter } from 'next/navigation';
//============= LIBRARIES ===================
import Swal from 'sweetalert2';
//============= REDUX ===================
import { useDispatch } from 'react-redux';
import { createUser } from '@/GlobalRedux/features/auth/authorizationSlice';
import { AppDispatch } from '@/GlobalRedux/store';
//###############################################################

export default function SingUp() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeated, setPasswordRepeated] = React.useState('');

  const handleButton = async () => {
    const result = await dispatch(
      createUser({ email, name, password, passwordRepeated })
    );
    if (createUser.rejected.match(result)) {
      Swal.fire({
        title: 'Error!',
        text: (result.payload as string) || 'Unknown error',
        icon: 'error',
        confirmButtonText: 'Got it',
      });
      return;
    }

    Swal.fire({
      title: 'Success!',
      text: 'Account was created successfully',
      icon: 'success',
      confirmButtonText: 'Got it',
    });
    router.push('/email-code-check');
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
