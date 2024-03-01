import { Router } from 'express';
import { createUser, index, logout } from '../../app/controllers/UserController';
import { createJWT, userJWT } from '../../app/middlewares/AuthMiddleware';
import { UserValidator } from '../../app/validators/UserValidator';

const router = Router();

// Home
router.get('/', userJWT, index);

// Register

router.post('/login', createJWT);

router.post('/register', UserValidator, createUser);

router.get('/logout', logout)

export { router as userRouter };