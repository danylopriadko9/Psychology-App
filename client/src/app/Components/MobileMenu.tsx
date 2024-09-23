'use client';
import Link from 'next/link';
import { navLinks } from './Header';
import { INavLink } from '../types/links';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuStatus } from '@/GlobalRedux/features/mobileMenu/menuSlice';

export default function MobileMenu() {
  const dispatch = useDispatch();

  return (
    <div className=' w-screen h-screen z-50 bg-black/[0.8] absolute flex flex-col'>
      <div className=' relative w-full'>
        <div
          className=' absolute right-0 top-0 text-white p-10 cursor-pointer'
          onClick={() => dispatch(changeMenuStatus())}
        >
          <CloseIcon fontSize={'large'} />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center gap-8 w-full h-full'>
        {navLinks.map((el: INavLink, i: number) => (
          <Link
            className='text-white font-bold text-2xl border-b-2 border-white/[0.1] hover:border-white active:border-white'
            key={i}
            href={el.url}
            onClick={() => dispatch(changeMenuStatus())}
          >
            {el.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
