//###############################################################
//============= REQ, RES TYPES ===================
import { Request, Response } from 'express';
//============= MONGODB MODELS ===================
import { Contact } from '../models/contact.model';
import { emailVerification } from '../utils/emailVerification';
//###############################################################

export const createContactRequest = async (req: Request, res: Response) => {
  const { email, name, message } = req.body;
  try {
    if (!email || !message || !name) {
      throw new Error('All fields are required');
    }

    //Email validation
    if (!emailVerification(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect email' });
    }

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    res.status(201).send({
      success: true,
      message: 'Contact request was created successfully',
    });
  } catch (error) {
    let message;
    if (error) message = String(error);
    else
      res.status(400).json({
        success: false,
        message: '[server/Contact-Controller]: Unknown error occured',
      });
    res.status(400).json({ success: false, message: message });
  }
};
