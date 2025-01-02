//###############################################################
//============= CRYPTO SERVICES ===================
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
//============= REQ, RES TYPES ===================
import { Request, Response } from 'express';
//============= MONGODB MODELS ===================
import { User } from '../models/user.model';
//============= UTILITIES ===================
import { generateVerificationToken } from '../utils/generateVerificationToken';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';
import { emailVerification } from '../utils/emailVerification';
//============= EMAIL SERVICES ===================
import { sendEmail } from '../nodemailer/sendEmail';
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from '../nodemailer/emailTemplates';
import mongoose from 'mongoose';
import { IRequest } from '../types/middleware.verifyToken';
//###############################################################

export const SignUp = async (req: Request, res: Response) => {
  const { email, name, password, passwordRepeated } = req.body;
  try {
    if (!email || !password || !passwordRepeated || !name) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    //Email validation
    if (!emailVerification(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect email' });
    }

    if (passwordRepeated !== password) {
      return res.status(400).json({
        success: false,
        message: 'Passwords are not the same',
      });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

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
    generateTokenAndSetCookie(res, user);
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
      message: "User's account was created successfully",
      user: { ...user._doc, password: undefined, verificationToken: undefined },
    });
  } catch (error) {
    let message;
    if (error) message = String(error);
    else
      res.status(400).json({
        success: false,
        message: 'Unknown error occured',
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

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
      });
    }

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
      message: "User's account was verified successfully!",
      user: { ...user._doc, password: undefined, verificationToken: undefined },
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
      return res.status(400).json({ success: false, message: 'Invalid email' });

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
      user: { ...user._doc, password: undefined, verificationToken: undefined },
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

    generateTokenAndSetCookie(res, user);
    user.lastLogin = new Date(Date.now());
    await user.save();

    res.status(200).json({
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
  res.clearCookie('email');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });

    //generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const randomTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = new Date(randomTokenExpiresAt);

    await user.save();

    //send email to the user
    if (!process.env.CLIENT_URL)
      return res
        .status(400)
        .json({ success: false, message: 'Client url has not found' });

    sendEmail(
      email,
      'Reset Password',
      PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        '{resetURL}',
        `${process.env.CLIENT_URL}/reset-password/${resetToken}`
      )
    );

    res.status(200).json({
      success: true,
      message: 'Email with reset password link was sended correctly',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    const message = String(error);
    console.log('Error in forgotPassword ', error);
    res.status(400).json({ success: false, message });
  }
};

export const ResetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password, resetPasswordToken } = req.body;
    const user = await User.findOne({ email, resetPasswordToken });
    if (!user) return res.status(404).json('Invalid email');

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    sendEmail(
      email,
      'Password was changed successfully!',
      PASSWORD_RESET_SUCCESS_TEMPLATE
    );

    res.status(200).json({
      success: true,
      message: 'Password was changed successfully',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    let message = String(error);
    console.log('error in reset password ', message);
    res
      .status(400)
      .json({ success: false, message: 'Error in reset password' });
  }
};

export const checkAuth = async (req: IRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res
        .status(400)
        .json({ success: false, message: 'User ID is undefined' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User does not existm invalid user ID',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User is authorized successfully',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    let message = String(error);
    console.log('error in auth check ', message);
    res.status(400).json({ success: false, message: 'Error in auth check' });
  }
};
