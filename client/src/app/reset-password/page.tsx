'use client';

import React from 'react';
import OTPInput from '../Components/OTPInput';
import Timer from '../Components/Timer';

export default function EmailCodeCheck() {
  const [email, setEmail] = React.useState<string>('');
  const [isCodeSend, setIsCodeSend] = React.useState<boolean>(false);

  const [timeLeft, setTimeLeft] = React.useState(30);

  return (
    <div className=' flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col md:w-1/3 w-11/12'>
        {isCodeSend ? (
          <>
            <h1 className=' text-3xl font-bold text-left w-full mb-5'>
              Provide code from your email 🔒
            </h1>
            <OTPInput length={5} />
            <button
              onClick={() => setIsCodeSend(true)}
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
