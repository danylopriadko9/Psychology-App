import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateVerificationToken } from '../utils/generateVerificationToken';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';
import { sendEmail } from '../nodemailer/sendEmail';
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from '../nodemailer/emailTemplates';

export const SignUp = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error('[server]: All fields are required');
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    if (!process.env.BCRYPT_SECRET)
      return res.status(400).json({
        success: false,
        message: 'Error (BCRYPT_SECRET is undefined)',
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();
    generateTokenAndSetCookie(res, user._id);
    sendEmail(
      user.email,
      'Email Verification',
      VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      )
    );

    res.status(201).send({
      success: true,
      message: 'User created successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    let message;
    if (error) message = String(error);
    else
      res.status(400).json({
        success: false,
        message: '[server/SignUp-Controller]: Unknown error occured',
      });
    res.status(400).json({ success: false, message: message });
  }
};

export const VerifyEmail = async (req: Request, res: Response) => {
  const { code, email } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
      email,
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
      });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendEmail(
      user.email,
      'Welcome from Elena Halashova!',
      WELCOME_EMAIL_TEMPLATE.replace('{name}', user.name)
    );

    res.status(200).json({
      success: true,
      message: 'User was verified successfully!',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    let message;
    if (error) message = String(error);
    else
      res.status(400).json({
        success: false,
        message: '[server/Verify-Email-Controller]: Unknown error occured',
      });
    res.status(400).json({ success: false, message: message });
  }
};

export const SendAnotherEmailVerificationCode = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(200).json({ success: false, message: 'Invalid email' });

    const code = generateVerificationToken();
    user.verificationToken = code;
    user.verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    await user.save();

    sendEmail(
      user.email,
      'Email Verification',
      VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', code)
    );

    res.status(200).json({
      success: true,
      message: 'New email verification code was send successfully',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    let message;
    if (error) message = String(error);
    else
      res.status(400).json({
        success: false,
        message:
          '[server/Send-Another-Email-Verification-Code]: Unknown error occured',
      });
    res.status(400).json({ success: false, message: message });
  }
};

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date(Date.now());
    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: 'Logged in successfully',
        user: { ...user._doc, password: undefined },
      });
  } catch (error) {
    throw new Error(`[server:SignIn]: Something went wrong ${String(error)}`);
  }
};

export const Logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
