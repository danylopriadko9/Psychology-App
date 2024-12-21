'use client';
import React from 'react';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

type eType =
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLInputElement>;

type formType = {
  name: string;
  email: string;
  message: string;
};

type dataType = {
  success: boolean;
  message: string;
};

export default function ContactForm() {
  const [message, setMessage] = React.useState<formType>({
    name: '',
    email: '',
    message: '',
  });

  const handleForm = (e: eType) => {
    setMessage((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const sendForm = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/contact/',
        message
      );
      Swal.fire({
        title: 'Success!',
        text: 'The contact request was created successfully!',
        icon: 'success',
        confirmButtonText: 'Cool',
      });
      setMessage(() => ({
        name: '',
        email: '',
        message: '',
      }));
    } catch (error) {
      const e = error as AxiosError;
      const res = e.response?.data as dataType;
      Swal.fire({
        title: 'Error!',
        text: res.message.replace('Error: ', ''),
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  };

  return (
    <div className=' flex flex-col gap-3 w-full'>
      <h1 className=' text-4xl'>Contact Form</h1>
      <input
        className='p-2 bg-slate-200 outline-none rounded-md'
        type='text'
        placeholder='Name'
        name='name'
        onChange={(e) => handleForm(e)}
        value={message.name}
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
    </div>
  );
}
