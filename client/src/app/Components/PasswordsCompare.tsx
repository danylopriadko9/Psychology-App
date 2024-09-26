import React from 'react';
import ButtonElement from './ButtonElement';
import PasswordInput from './PasswordInput';
import Swal from 'sweetalert2';

interface IProps {
  buttonTitle: string;
  buttonFunctionAfterValidation(): void;
}

export default function PasswordCompare({
  buttonTitle,
  buttonFunctionAfterValidation,
}: IProps) {
  const [password, setPassword] = React.useState<string>('');
  const [repeatedPassword, setRepeatedPassword] = React.useState<string>('');

  const passwordsAreNotTheSameError = () => {
    if (password !== repeatedPassword || password === '') {
      Swal.fire({
        title: 'Error!',
        text: 'The passwords you entered do not match...',
        icon: 'error',
        confirmButtonText: 'Try one more time',
      });
      return;
    }

    Swal.fire({
      title: 'Great!',
      text: 'Account has been created! You will be redirected to the home page after a few seconds...',
      icon: 'success',
      confirmButtonText: 'Got it!',
    });

    buttonFunctionAfterValidation();
    //Request on server
  };

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
      <ButtonElement
        title={buttonTitle}
        handleClick={passwordsAreNotTheSameError}
      />
    </div>
  );
}
