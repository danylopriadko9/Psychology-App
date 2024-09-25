'use client';

import React from 'react';
import OTPInput from '../Components/OTPInput';
import Timer from '../Components/Timer';
import { IPasswords } from '../types/links';
import Swal from 'sweetalert2';

export default function EmailCodeCheck() {
  const [email, setEmail] = React.useState<string>('');
  const [isCodeSend, setIsCodeSend] = React.useState<boolean>(false);
  const [isCodesTheSame, setIsCodesTheSame] = React.useState(false);
  const [isPasswordVissible, setIsPasswordVissible] =
    React.useState<boolean>(false);
  const [isRepeatedPasswordVissible, setIsRepeatedPasswordVissible] =
    React.useState<boolean>(false);

  const [timeLeft, setTimeLeft] = React.useState(30);

  const handlePasswords = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  return (
    <div className=' flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col md:w-1/3 w-11/12'>
        {isCodeSend ? (
          isCodesTheSame ? (
            <div className=' flex flex-col gap-3'>
              <h1 className=' text-3xl font-bold text-left w-full mb-5'>
                Provide new password 🔒
              </h1>

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
                Change password
              </button>
            </div>
          ) : (
            <>
              <h1 className=' text-3xl font-bold text-left w-full mb-5'>
                Provide code from your email 🔒
              </h1>
              <OTPInput length={5} />
              <button
                onClick={() => setIsCodesTheSame(true)}
                className='rounded-md bg-[#0E2D3B] active:bg-[#0c2531] hover:bg-[#133c4f] text-white py-3 mt-8'
              >
                Check code
              </button>
              <p className='text-right mt-3'>
                Don't get any mails?{' '}
                {timeLeft === 0 ? (
                  <span
                    className='underline text-blue-500 cursor-pointer'
                    onClick={() => setTimeLeft(30)}
                  >
                    Resend code
                  </span>
                ) : (
                  <span className=' text-gray-500 underline'>
                    Resend code after{' '}
                    <Timer setTimeLeft={setTimeLeft} timeLeft={timeLeft} /> sec.
                  </span>
                )}
              </p>
            </>
          )
        ) : (
          <>
            <h1 className=' text-3xl font-bold text-left w-full mb-5'>
              Provide your email 📨
            </h1>
            <input
              className=' rounded-md border bg-[#E7F0FF] px-6 py-3 focus:outline-none'
              name='email'
              type='text'
              placeholder='example@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={() => setIsCodeSend(true)}
              className='rounded-md bg-[#0E2D3B] active:bg-[#0c2531] hover:bg-[#133c4f] text-white py-3 mt-8'
            >
              Send code
            </button>
          </>
        )}
      </div>
    </div>
  );
}
