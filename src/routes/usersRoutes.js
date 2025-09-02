import express from 'express';
import {
  registerUser,
  loginUser,
  guestLogin,
  getCurrentUser,
  getUserById
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/guest', guestLogin);
userRouter.get('/main-page', authMiddleware, getCurrentUser);
userRouter.get('/:user_id', authMiddleware, getUserById);

export default userRouter;
