import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './App';

//Redux importing
import { store } from './redux/store';
import { Provider } from 'react-redux';

import Home from './pages/home/Home';
import ErrorPage from './pages/error/Error-page';
import SignIn from './pages/sign-in/Sign-in';
import SignUp from './pages/sign-up/Sign-up';

//React router dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './pages/profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profiles/:id',
    element: <Profile />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
