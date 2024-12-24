//###############################################################
import express from 'express';
//============= CONTROLLERS ===================
import { createContactRequest } from '../controllers/contact.controller';
//###############################################################

const router = express.Router();

router.post('/', createContactRequest as any);

export default router;
