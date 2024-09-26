'use client';
import React from 'react';

interface IProps {
  type: 'password' | 'repeatedPassword';
  value: string;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  labelTitle: string;
  placeholder: string;
}

export default function PasswordInput({
  type,
  value,
  handleChange,
  labelTitle,
  placeholder,
}: IProps) {
  const [isPasswordVissible, setIsPasswordVissible] =
    React.useState<boolean>(false);
  return (
    <div className=' flex flex-col gap-1 w-full'>
      <label htmlFor={type}>{labelTitle}</label>
      <div className='flex w-full justify-between rounded-md border bg-[#E7F0FF] '>
        <input
          className='bg-[#E7F0FF] h-full w-11/12 px-6 py-3 focus:outline-none'
          name={type}
          type={isPasswordVissible ? 'text' : 'password'}
          placeholder={placeholder}
          onChange={(e) => handleChange(e)}
          value={value}
        />
        <button
          className='text-xl mr-2 bg-[#E7F0FF]'
          onClick={() => setIsPasswordVissible((prev) => !prev)}
        >
          {isPasswordVissible ? '🐵' : '🙈'}
        </button>
      </div>
    </div>
  );
}
