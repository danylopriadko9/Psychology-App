import express from 'express';
import {
  Logout,
  SendAnotherEmailVerificationCode,
  SignIn,
  SignUp,
  VerifyEmail,
} from '../controllers/auth.controller';
const router = express.Router();

router.post('/sign-up', SignUp as any);
router.post('/sign-in', SignIn as any);
router.post('/logout', Logout);

router.post('/verify-email', VerifyEmail as any);
router.post(
  '/send-new-email-verification-code',
  SendAnotherEmailVerificationCode as any
);

export default router;
