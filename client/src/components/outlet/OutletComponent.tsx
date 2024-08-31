import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const OutletComponent: React.FC = () => {
  return (
    <>
      <div className='flex w-screen justify-center gap-8'>
        <Link to={`/`}>Home</Link>
        <Link to={`/sign-up`}>Sign Up</Link>
        <Link to={`/sign-in`}>Sign In</Link>
      </div>
      <Outlet />
    </>
  );
};

export default OutletComponent;
