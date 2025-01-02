import express from 'express';
import {
  ForgotPassword,
  Logout,
  SendAnotherEmailVerificationCode,
  SignIn,
  SignUp,
  VerifyEmail,
  ResetPassword,
  checkAuth,
} from '../controllers/auth.controller';
import { VerifyToken } from '../middlewares/verifyToken';
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(cookieParser());

router.post('/auth-check', VerifyToken as any, checkAuth as any);
router.post('/sign-up', SignUp as any);
router.post('/sign-in', SignIn as any);
router.post('/logout', Logout);

router.post('/verify-email', VerifyEmail as any);
router.post(
  '/send-new-email-verification-code',
  SendAnotherEmailVerificationCode as any
);

router.post('/forgot-password', ForgotPassword as any);
router.post('/reset-password', ResetPassword as any);
export default router;
