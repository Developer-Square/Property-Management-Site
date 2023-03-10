import express, { Router } from 'express';
import { forgotPasswordController, loginController, logoutController, refreshTokensController, registerController, resetPasswordController, sendVerificationEmailController, verifyEmailController, loginWithGoogleController, setPasswordController } from '../controllers/auth.controller';
import authMiddleware from '../middleware/auth.middleware';

const router: Router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/google', loginWithGoogleController);
router.post('/logout', logoutController);
router.post('/refresh-tokens', refreshTokensController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);
router.post('/set-password', setPasswordController);
router.post('/send-verification-email', authMiddleware(), sendVerificationEmailController);
router.post('/verify-email', verifyEmailController);

export default router;