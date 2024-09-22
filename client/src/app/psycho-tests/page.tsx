import Link from 'next/link';
import { INavLink } from '../types/links';

export default function PsychoTests() {
  return (
    <div>
      Psychotests
      <div className=' flex flex-col gap-5 p-10'>
        {navLinks.map((el: INavLink, i: number) => (
          <Link className=' underline' key={i} href={el.url}>
            {el.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

const navLinks: INavLink[] = [
  {
    title: 'Szondi Test',
    url: '/szondi-test',
    description: 'Szondi Test Description',
  },
  {
    title: 'Luscher Test',
    url: '/luscher-test',
    description: 'Luscher Test Description',
  },
  {
    title: 'Test for Identifying Personality Disorders',
    url: '/identifying-personality-disorders-test',
    description: 'Test for Identifying Personality Disorders Description',
  },
];
