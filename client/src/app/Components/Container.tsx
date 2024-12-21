'use client';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return <div className='w-[50%]'>{children}</div>;
}
