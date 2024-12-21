'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { INavLink } from '../types/links';
import MenuIcon from '@mui/icons-material/Menu';

//Redux
import { useDispatch } from 'react-redux';
import { changeMenuStatus } from '@/GlobalRedux/features/mobileMenu/menuSlice';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  return (
    <header className=' flex justify-between w-full h-24 border-b pr-5 pl-5 items-center'>
      <Link href='/' className='cursor-pointer'>
        Logo
      </Link>
      <div className=' md:hidden flex gap-2 items-center'>
        <Link
          className={`flex px-4 py-2 justify-center items-center gap-2 rounded-md border cursor-pointer ${
            pathname === '/sign-in' ? 'bg-[#101728] text-white' : ''
          }`}
          href='/sign-in'
        >
          Sing-In
        </Link>
        <div className='px-2 py-2' onClick={() => dispatch(changeMenuStatus())}>
          <MenuIcon />
        </div>
      </div>
      <div className='md:flex gap-3 hidden items-center'>
        {navLinks.map((el: INavLink, i: number) => (
          <Link
            key={i}
            href={el.url}
            className={`text-zinc-400 transition ${
              pathname === el.url ? 'text-zinc-900' : ''
            }`}
          >
            {el.title}
          </Link>
        ))}
        <ThemeToggle />
        <Link
          className={`flex px-4 py-2 justify-center items-center gap-2 rounded-md border cursor-pointer ${
            pathname === '/sign-in' ? 'bg-[#101728] text-white' : ''
          }`}
          href='/sign-in'
        >
          Sing-In
        </Link>
      </div>
    </header>
  );
}

export const navLinks: INavLink[] = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Pricing',
    url: '/pricing',
  },
  {
    title: 'Tests',
    url: '/psycho-tests',
  },
  {
    title: 'Blog',
    url: '/blog',
  },
  {
    title: 'About me',
    url: '/about-me',
  },
];
