'use client';

import React from 'react';
import OTPInput from '../Components/OTPInput';
import Timer from '../Components/Timer';
import { IPasswords } from '../types/links';
import Swal from 'sweetalert2';
import PasswordInput from '../Components/PasswordInput';
import ButtonElement from '../Components/ButtonElement';
import InputElement from '../Components/InputElement';

//NEED TO BE REFACTORED, SOME LOGIC MUST BE REPLACED IN OWN COMPONENTS

export default function EmailCodeCheck() {
  const [email, setEmail] = React.useState<string>('');
  const [isCodeSend, setIsCodeSend] = React.useState<boolean>(false);
  const [isCodesTheSame, setIsCodesTheSame] = React.useState(false);

  const [timeLeft, setTimeLeft] = React.useState(30);

  //   const handlePasswords = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //   };

  const [password, setPassword] = React.useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = React.useState<string>('');

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
    <div className=' flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col md:w-1/3 w-11/12'>
        {isCodeSend ? (
          isCodesTheSame ? (
            <div className=' flex flex-col gap-3'>
              <h1 className=' text-3xl font-bold text-left w-full mb-5'>
                Provide new password 🔒
              </h1>
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
                placeholder='Repeat new password here...'
              />
              <ButtonElement
                title='Change password'
                handleClick={passwordsAreNotTheSameError}
              />
            </div>
          ) : (
            <>
              <h1 className=' text-3xl font-bold text-left w-full mb-5'>
                Provide code from your email 🔒
              </h1>
              <OTPInput length={5} />
              <ButtonElement
                title='Provide code'
                handleClick={() => setIsCodesTheSame(true)}
              />
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
            <InputElement
              labelTitle=''
              name='email'
              placeholder='example@gmail.com'
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <ButtonElement
              title='Send code'
              handleClick={() => setIsCodeSend(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}
