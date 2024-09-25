'use client';
import React from 'react';

interface IProps {
  type: 'password' | 'repeatedPassword';
  value: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
  labelTitle: string;
}

export default function PasswordInput({
  type,
  value,
  handleChange,
  labelTitle,
}: IProps) {
  const [isPasswordVissible, setIsPasswordVissible] =
    React.useState<boolean>(false);
  return (
    <div>
      <label htmlFor={type}>{labelTitle}</label>
      <div className='flex w-full justify-between rounded-md border bg-[#E7F0FF] '>
        <input
          className='bg-[#E7F0FF] h-full w-11/12 px-6 py-3 focus:outline-none'
          name={type}
          type={isPasswordVissible ? 'text' : 'password'}
          placeholder='At least 8 characters'
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
