'use client';
import React, { useRef, useState } from 'react';

interface OTPInputProps {
  length: number;
}

const OTPInput: React.FC<OTPInputProps> = ({ length }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    console.log(otp);
  }, [otp]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text');
    const pasteArray = pasteData.split('').slice(0, length);
    const newOtp = [...otp];

    pasteArray.forEach((char, i) => {
      newOtp[i] = char;
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = char;
      }
    });

    setOtp(newOtp);

    const lastIndex = Math.min(pasteArray.length - 1, length - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  return (
    <div className='flex gap-5 w-full justify-around'>
      {otp.map((digit, index) => (
        <input
          key={index}
          type='number'
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          className='px-5 py-8 border rounded-md w-1/6 text-center text-2xl'
        />
      ))}
    </div>
  );
};

export default OTPInput;
