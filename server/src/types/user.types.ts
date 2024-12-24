import mongoose from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  name: string;
  lastLogin: Date;
  isVerified: boolean;
  resetPasswordToken: String | undefined;
  resetPasswordExpiresAt: Date | undefined;
  verificationToken: String | undefined;
  verificationTokenExpiresAt: Date | undefined;
}

export interface IUserDocument extends IUser, mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}
