'use client';
import React from 'react';
import InputElement from '../Components/InputElement';
import ButtonElement from '../Components/ButtonElement';
import { useRouter } from 'next/navigation';

export default function EmailProvide() {
  const [email, setEmail] = React.useState<string>('');
  const router = useRouter();

  const handleButton = () => {
    router.push('/email-code-check');
  };

  return (
    <div className=' flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col md:w-1/3 w-11/12'>
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

        <ButtonElement title='Send code' handleClick={handleButton} />
      </div>
    </div>
  );
}
