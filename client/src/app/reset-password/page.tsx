'use client';

import React from 'react';
import OTPInput from '../Components/OTPInput';
import Timer from '../Components/Timer';
import ButtonElement from '../Components/ButtonElement';
import InputElement from '../Components/InputElement';
import PasswordCompare from '../Components/PasswordsCompare';

export default function EmailCodeCheck() {
  const [email, setEmail] = React.useState<string>('');
  const [isCodeSend, setIsCodeSend] = React.useState<boolean>(false);
  const [isCodesTheSame, setIsCodesTheSame] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(30);

  return (
    <div className=' flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col md:w-1/3 w-11/12'>
        {isCodeSend ? (
          isCodesTheSame ? (
            <div className=' flex flex-col gap-3'>
              <h1 className=' text-3xl font-bold text-left w-full mb-5'>
                Provide new password 🔒
              </h1>
              <PasswordCompare
                buttonTitle='Change password'
                buttonFunctionAfterValidation={() => {}}
                //Maybe also I will need to add props such as name, email or userId
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
