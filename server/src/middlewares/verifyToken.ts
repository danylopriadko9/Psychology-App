import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IJwtPayload, IRequest } from '../types/middleware.verifyToken';

export const VerifyToken = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req);
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: 'Unauthorized - no token provided' });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: 'Server fail' });
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as IJwtPayload;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorize - Invalid token' });
    }
    req.userId = userId;
    next();
  } catch (error) {
    let message = String(error);
    console.log('error in verify token ', message);
    res.status(400).json({ success: false, message: 'Error in verify token' });
  }
};
