'use client';
//import { Metadata } from 'next';
import React from 'react';

// export const metadata: Metadata = {
//   title: 'Lusher Test',
//   description: 'Generated by create next app',
// };

export default function LuscherTest() {
  const [actualColorsLine, setActualColorsLine] = React.useState<IColor[]>([]);
  const [colors, setColors] = React.useState<IColor[]>(colorsData);

  const handleClick = (el: IColor) => {
    if (el.color === 'white') return;

    setColors((prev) =>
      prev.map((e) => (e.color === el.color ? { ...e, color: 'white' } : e))
    );

    setActualColorsLine([...actualColorsLine, el]);
  };

  const reset = () => {
    setActualColorsLine([]);
    setColors(colorsData);
  };

  React.useEffect(() => {
    console.log(actualColorsLine);
  }, [actualColorsLine]);

  return (
    <div>
      <div className='grid grid-cols-4 gap-4 w-1/3 mx-auto mt-5'>
        {colors.map((el: IColor, i: number) => (
          <div
            onClick={() => {
              handleClick(el);
            }}
            key={i}
            style={{
              backgroundColor: el.color,
            }}
            className={`w-24 h-40 rounded-md ${
              el.color === 'white' ? '' : 'cursor-pointer'
            }`}
          ></div>
        ))}
      </div>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}

interface IColor {
  color: string;
}

const colorsData: IColor[] = [
  {
    color: '#004485',
  },
  {
    color: '#009E75',
  },
  {
    color: '#241F20',
  },
  {
    color: '#EA007B',
  },
  {
    color: '#D54500',
  },
  {
    color: '#F2E300',
  },
  {
    color: '#99938D',
  },
  {
    color: '#FF0000',
  },
];