'use client';
import { useEffect } from 'react';

interface IProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

export default function Timer({ timeLeft, setTimeLeft }: IProps) {
  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return <span>{timeLeft}</span>;
}
