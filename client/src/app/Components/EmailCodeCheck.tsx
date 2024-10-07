import React from 'react';
import ButtonElement from './ButtonElement';
import OTPInput from './OTPInput';
import Timer from './Timer';

interface IProps {
  setIsCodesTheSame: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmailCodeCheck({ setIsCodesTheSame }: IProps) {
  const [timeLeft, setTimeLeft] = React.useState(30);

  const handleButton = () => {
    setTimeLeft(30);
    // request to generate and send new code on the user's email
  };

  const handleCheckCode = () => {
    // send request to the server to check that codes are the same
    // and if the code is correct =>
    setIsCodesTheSame(true);
  };

  return (
    <div className='flex flex-col justify-center items-center py-20'>
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
  );
}
