import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateVerificationToken } from '../utils/generateVerificationToken';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';
import { sendVerificationMail } from '../nodemailer/sendVerificationMail';
import { VERIFICATION_EMAIL_TEMPLATE } from '../nodemailer/emailTemplates';

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
    sendVerificationMail(
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

export const SignIn = async (req: Request, res: Response) => {
  res.send('SignIn');
};

export const Logout = async (req: Request, res: Response) => {
  res.send('Logout');
};
