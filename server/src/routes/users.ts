import { Router } from 'express';
import { createUser, getUserById, getUsers } from '../handlers/users';

const router = Router();

// api/users/
router.get('/', getUsers);

// api/users/{some id}
router.get('/:id', getUserById);

// api/users
router.post('/', createUser);

export default router;
