import mongoose from 'mongoose';
import { IContactDocument } from '../types/contact.types';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Contact = mongoose.model<IContactDocument>(
  'Contact',
  contactSchema
);
