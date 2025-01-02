import { Request } from 'express';
import mongoose from 'mongoose';

export interface IRequest extends Request {
  userId: mongoose.Types.ObjectId | null;
}

export interface IJwtPayload {
  userId: mongoose.Types.ObjectId;
}
