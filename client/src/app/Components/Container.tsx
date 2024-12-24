'use client';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-[90%] md:w-[60%] xl:w-[40%]'>{children}</div>
    </div>
  );
}
