'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { INavLink } from '../types/links';

export default function Header() {
  const pathname = usePathname();

  React.useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  return (
    <header className=' flex justify-between w-full h-24 border-b pr-5 pl-5 items-center'>
      <span>Logo</span>
      <div className='flex gap-10'>
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
      </div>
    </header>
  );
}

const navLinks: INavLink[] = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Tests',
    url: '/psycho-tests',
  },
  {
    title: 'About me',
    url: '/about-me',
  },
  {
    title: 'Sign-up',
    url: '/sign-up',
  },
  {
    title: 'Sign-in',
    url: '/sign-in',
  },
];
