import React, { Dispatch, SetStateAction } from 'react';
import ButtonElement from './ButtonElement';
import PasswordInput from './PasswordInput';

interface IProps {
  buttonTitle: string;
  buttonFunction(): void;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  passwordRepeated: string;
  setPasswordRepeated: Dispatch<SetStateAction<string>>;
}

export default function PasswordCompare({
  buttonTitle,
  buttonFunction,
  password,
  setPassword,
  passwordRepeated,
  setPasswordRepeated,
}: IProps) {
  return (
    <div className='flex flex-col gap-3'>
      <PasswordInput
        type='password'
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
        labelTitle='Password'
        placeholder='At least 8 characters'
      />
      <PasswordInput
        type='repeatedPassword'
        value={passwordRepeated}
        handleChange={(e) => setPasswordRepeated(e.target.value)}
        labelTitle='Repeat your password'
        placeholder='Repeat your password here...'
      />
      <ButtonElement title={buttonTitle} handleClick={buttonFunction} />
    </div>
  );
}
