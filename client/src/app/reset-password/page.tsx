'use client';

import React from 'react';
import PasswordCompare from '../Components/PasswordsCompare';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const router = useRouter();
  const handleButton = () => {
    router.push('/sign-in');
  };
  return (
    <div className=' flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col md:w-1/3 w-11/12'>
        <div className=' flex flex-col gap-3'>
          <h1 className=' text-3xl font-bold text-left w-full mb-5'>
            Provide new password 🔒
          </h1>
          <PasswordCompare
            buttonTitle='Change password'
            buttonFunction={handleButton}
            successPopUpMessage='Your password was changed successfully!'
            errorPopUpMessage='Something went wrong...'
            errorFunction={() => {}}
            successButtonTitle='Got it!'
            errorButtonTitle='Try one more time'
          />
        </div>
      </div>
    </div>
  );
}
