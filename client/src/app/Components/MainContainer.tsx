'use client';
import { ReactNode } from 'react';
import MobileMenu from './MobileMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/GlobalRedux/store';

interface Props {
  children: ReactNode;
}

export default function MainContainer({ children }: Props) {
  const { isMenuOpen } = useSelector((state: RootState) => state.menu);

  return (
    <div className=' flex flex-col w-full items-center'>
      {isMenuOpen ? <MobileMenu /> : <></>}
      {children}
    </div>
  );
}
