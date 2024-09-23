'use client';
import { RootState } from '@/GlobalRedux/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import MobileMenu from './MobileMenu';

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  const { isMenuOpen } = useSelector((state: RootState) => state.menu);
  return (
    <div>
      {isMenuOpen ? <MobileMenu /> : <></>}
      {children}
    </div>
  );
}
