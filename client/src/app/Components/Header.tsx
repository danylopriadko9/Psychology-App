import Link from 'next/link';

export default function Header() {
  return (
    <header className=' flex gap-10 underline'>
      {navLinks.map((el: INavLink, i: number) => (
        <Link key={i} href={el.url}>
          {el.title}
        </Link>
      ))}
    </header>
  );
}

interface INavLink {
  title: string;
  url: string;
}

const navLinks: INavLink[] = [
  {
    title: 'Sign-up',
    url: 'sign-up',
  },
  {
    title: 'Sign-in',
    url: 'sign-in',
  },
  {
    title: 'Home',
    url: '/',
  },
];
