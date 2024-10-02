'use client';
import React from 'react';
import ButtonElement from '../Components/ButtonElement';
import OTPInput from '../Components/OTPInput';
import Timer from '../Components/Timer';
import { useRouter } from 'next/navigation';

export default function EmailCodeCheck() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = React.useState(30);

  const handleButton = () => {
    setTimeLeft(30);
    // request to generate and send new code on the user's email
  };

  const handleCheckCode = () => {
    // send request to the server to check that codes are the same
    // and if the code is correct =>
    router.push('/reset-password');
  };

  return (
    <div className='flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col md:w-1/3 w-11/12'>
        <div className='flex flex-col gap-3'>
          <h1 className=' text-3xl font-bold text-left w-full mb-5'>
            Provide code from your email 🔒
          </h1>
          <OTPInput length={5} />
          <ButtonElement title='Provide code' handleClick={handleCheckCode} />
          <p className='text-right mt-3'>
            Don't get any mails?{' '}
            {timeLeft === 0 ? (
              <span
                className='underline text-blue-500 cursor-pointer'
                onClick={handleButton}
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
        </div>
      </div>
    </div>
  );
}
