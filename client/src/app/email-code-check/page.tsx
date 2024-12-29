'use client';
//###############################################################
import React from 'react';
//============= COMPONENTS ===================
import ButtonElement from '../Components/ButtonElement';
import OTPInput from '../Components/OTPInput';
import Timer from '../Components/Timer';
//============= HOOKS ===================
import { useRouter } from 'next/navigation';
//============= PACKAGES ===================
import Swal from 'sweetalert2';
//============= REDUX ===================
import { AppDispatch, RootState } from '@/GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  emailVerification,
  SendAnotherEmailVerificationCode,
} from '@/GlobalRedux/features/auth/authorizationSlice';
import { ISignUpState } from '../types/reduxTypes/auth';
//###############################################################

export default function EmailCodeCheck() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector<RootState, ISignUpState>(
    (state) => state.authorization
  );

  const [timeLeft, setTimeLeft] = React.useState<number>(30);
  const inputRefs = React.useRef<HTMLInputElement[]>([]);

  const resendCodeButton = async () => {
    console.log('user: ', user?.email);
    const response = await dispatch(
      SendAnotherEmailVerificationCode(user?.email || '')
    );
    if (SendAnotherEmailVerificationCode.rejected.match(response)) {
      Swal.fire({
        title: 'Error!',
        text: (response.payload as string) || 'Unknown error occupied',
        icon: 'error',
        confirmButtonText: 'Got it',
      });
      return;
    }
    setTimeLeft(30);
  };

  const handleButton = async () => {
    //Join the code from email to a string
    const code = inputRefs.current.map((el, _) => el.value).join('');

    const result = await dispatch(
      emailVerification({ code, email: user?.email || '' })
    );

    if (emailVerification.rejected.match(result)) {
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
      text: 'Your email was verified successfully',
      icon: 'success',
      confirmButtonText: 'Got it',
    });
    router.push('/');
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
                onClick={() => resendCodeButton()}
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
