import { Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
export const generateTokenAndSetCookie = (
  res: Response,
  userId: mongoose.Types.ObjectId
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      '[server:generateTokenAndSetCookie]: invalid JWT_SECRET in env file'
    );
  }
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', //https
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
