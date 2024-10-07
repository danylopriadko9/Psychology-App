import express from 'express';
import { Logout, SignIn, SignUp } from '../controllers/auth.controller';
const router = express.Router();

router.get('/sign-up', SignUp as any);

router.get('/sign-in', SignIn);

router.get('/logout', Logout);

export default router;
