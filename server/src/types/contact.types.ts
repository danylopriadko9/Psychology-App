import mongoose from 'mongoose';

export interface IContact {
  name: string;
  email: string;
  message: string;
  date: Date;
}

export interface IContactDocument extends IContact, mongoose.Document {
  _id: any;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}
