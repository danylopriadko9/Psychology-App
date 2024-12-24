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
    <div className=' flex flex-col justify-center items-center py-20 w-full'>
      <div className='flex flex-col w-full'>
        <div className=' flex flex-col gap-3'>
          <h1 className=' text-3xl font-bold text-left w-full mb-5'>
            Provide new password 🔒
          </h1>
          <PasswordCompare
            buttonTitle='Change password'
            buttonFunction={handleButton}
          />
        </div>
      </div>
    </div>
  );
}
