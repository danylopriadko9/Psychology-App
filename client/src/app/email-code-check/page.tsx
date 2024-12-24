'use client';
//###############################################################
import React from 'react';
//============= COMPONENTS ===================
import ButtonElement from '../Components/ButtonElement';
import OTPInput from '../Components/OTPInput';
import Timer from '../Components/Timer';
//============= TYPES ===================
import { IData } from '../types/data';
//============= HOOKS ===================
import { useRouter } from 'next/navigation';
//============= PACKAGES ===================
import Swal from 'sweetalert2';
import axios, { AxiosError } from 'axios';
//###############################################################

export default function EmailCodeCheck() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = React.useState<number>(30);
  const [email, setEmail] = React.useState<string>('danylopriadko9@gmail.com');
  const inputRefs = React.useRef<HTMLInputElement[]>([]);

  const resendCodeButton = async () => {
    try {
      //Sending a request for a new verification code
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/send-new-email-verification-code`,
        { email }
      );
      //Set new timer
      setTimeLeft(30);

      //Success Pop-up
      const d = data as IData;
      Swal.fire({
        title: 'Success!',
        text: d.message,
        icon: 'success',
        confirmButtonText: 'Got it',
      });
    } catch (error) {
      const e = error as AxiosError;
      const res = e.response?.data as IData;

      //Fail Pop-up
      Swal.fire({
        title: 'Error!',
        text: res.message.replace('Error: ', ''),
        icon: 'error',
        confirmButtonText: 'Got it',
      });
    }
  };

  const handleButton = async () => {
    try {
      //Join the code from email to a string
      const code = inputRefs.current.map((el, _) => el.value).join('');

      //Sending a request for an email verification
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-email`,
        { email, code }
      );

      //Success Pop-up
      const d = data as IData;
      Swal.fire({
        title: 'Success!',
        text: d.message,
        icon: 'success',
        confirmButtonText: 'Got it',
      });

      //Redirection on the main page
      router.push('/');
    } catch (error) {
      const e = error as AxiosError;
      const res = e.response?.data as IData;

      //Fail Pop-up
      Swal.fire({
        title: 'Error!',
        text: res.message.replace('Error: ', ''),
        icon: 'error',
        confirmButtonText: 'Got it',
      });
    }
  };

  return (
    <div className='flex flex-col justify-center items-center py-20 w-full'>
      <div className='flex flex-col w-full'>
        <div className='flex flex-col gap-3'>
          <h1 className=' text-3xl font-bold text-left w-full mb-5'>
            Provide code from your email 🔒
          </h1>
          <OTPInput length={6} inputRefs={inputRefs} />
          <ButtonElement title='Provide code' handleClick={handleButton} />
          <p className='text-right mt-3'>
            Don't get any mails?{' '}
            {timeLeft === 0 ? (
              <span
                className='underline text-blue-500 cursor-pointer'
                onClick={resendCodeButton}
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
