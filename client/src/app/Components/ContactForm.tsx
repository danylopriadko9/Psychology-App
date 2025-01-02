'use client';
import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { sendContactForm } from '@/GlobalRedux/features/contactForm/contactFormSlice';
import { ISendContactForm } from '../types/reduxTypes/contact';
import { AppDispatch, RootState } from '@/GlobalRedux/store';

type eType =
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLInputElement>;

export default function ContactForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authorization);

  const [message, setMessage] = React.useState<ISendContactForm>({
    userName: '',
    email: '',
    message: '',
  });

  React.useEffect(() => {
    setMessage((prev) => ({
      ...prev,
      userName: user ? user.name : '',
      email: user ? user.email : '',
    }));
  }, [user]);

  const handleForm = (e: eType) => {
    setMessage((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const clearForm = () => {
    setMessage(() => ({
      userName: '',
      email: '',
      message: '',
    }));
  };

  const sendForm = async () => {
    const result = await dispatch(sendContactForm(message));
    if (sendContactForm.rejected.match(result)) {
      Swal.fire({
        title: 'Error!',
        text: (result.payload as string) || 'Unknown error occured',
        icon: 'error',
        confirmButtonText: 'Got it',
      });
      return;
    }
    Swal.fire({
      title: 'Success!',
      text: 'The contact request was created successfully!',
      icon: 'success',
      confirmButtonText: 'Got it',
    });
    clearForm();
  };

  return (
    <div className=' flex flex-col gap-3 w-full'>
      <h1 className=' text-4xl'>Contact Form</h1>
      <input
        className='p-2 bg-slate-200 outline-none rounded-md'
        type='text'
        placeholder='Name'
        name='userName'
        onChange={(e) => handleForm(e)}
        value={message.userName}
      />
      <input
        className='p-2 bg-slate-200 outline-none rounded-md'
        type='text'
        placeholder='Email'
        name='email'
        onChange={(e) => handleForm(e)}
        value={message.email}
      />
      <div className='flex flex-col gap-1'>
        <textarea
          className='p-2 bg-slate-200 resize-none h-[200px] outline-none rounded-md'
          placeholder='Leave your message here'
          name='message'
          maxLength={250}
          onChange={(e) => handleForm(e)}
          value={message.message}
        />
        <p className={`text-right`}>{message.message.length}/250</p>
      </div>
      <button
        className='bg-orange-500 text-white items-center py-2 rounded-sm cursor-pointer hover:bg-orange-400 transition-all'
        onClick={sendForm}
      >
        Send
      </button>
      <button
        className='bg-gray-500 text-white items-center py-2 rounded-sm cursor-pointer hover:bg-gray-400 transition-all'
        onClick={clearForm}
      >
        Clear Form
      </button>
    </div>
  );
}
