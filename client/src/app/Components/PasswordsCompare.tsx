import React from 'react';
import ButtonElement from './ButtonElement';
import PasswordInput from './PasswordInput';
import Swal from 'sweetalert2';

interface IProps {
  buttonTitle: string;
  buttonFunction(): void;
  successPopUpMessage: string;
  errorPopUpMessage: string;
  errorFunction(): void;
  successButtonTitle: string;
  errorButtonTitle: string;
}

export default function PasswordCompare({
  buttonTitle,
  buttonFunction,
  successPopUpMessage,
  errorPopUpMessage,
  errorFunction,
  successButtonTitle,
  errorButtonTitle,
}: IProps) {
  const [password, setPassword] = React.useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = React.useState<string>('');

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
        value={repeatedPassword}
        handleChange={(e) => setRepeatedPassword(e.target.value)}
        labelTitle='Repeat your password'
        placeholder='Repeat your password here...'
      />
      <ButtonElement title={buttonTitle} handleClick={buttonFunction} />
    </div>
  );
}
