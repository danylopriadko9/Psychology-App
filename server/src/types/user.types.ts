import mongoose from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  name: string;
  lastLogin: Date;
  isVerified: boolean;
  resetPasswordToken: String;
  resrtPasswordExpiresAt: Date;
  verificationToken: String;
  verificationTokenExpiresAt: Date;
}

export interface IUserDocument extends IUser, mongoose.Document {
  _id: any;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}
