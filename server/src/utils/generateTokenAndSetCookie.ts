import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserDocument } from '../types/user.types';

export const generateTokenAndSetCookie = (
  res: Response,
  user: IUserDocument
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      '[server:generateTokenAndSetCookie]: invalid JWT_SECRET in env file'
    );
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', //https
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie('email', user._doc.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', //https
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
