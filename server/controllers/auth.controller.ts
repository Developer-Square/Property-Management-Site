import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { checkUser, loginUserWithEmailAndPassword, loginUserWithGoogle, logout, refreshAuth, resetPassword, verifyEmail } from '../services/auth.service';
import { generateAuthTokens, generateResetPasswordToken, generateVerifyEmailToken } from '../services/token.service';
import { createUser, updateUserById } from '../services/user.service';
import { sendResetPasswordEmail, sendVerificationEmail } from '../services/email.service';
import { ApiError } from '../errors';

export const registerController = catchAsync(async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  const tokens = await generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

export const loginController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginUserWithEmailAndPassword(email, password);
  const tokens = await generateAuthTokens(user);
  res.send({ user, tokens });
});

export const loginWithGoogleController = catchAsync(async (req: Request, res: Response) => {
  const user = await loginUserWithGoogle(req.body);
  const tokens = await generateAuthTokens(user);
  res.send({ user, tokens });
});

export const logoutController = catchAsync(async (req: Request, res: Response) => {
  await logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const refreshTokensController = catchAsync(async (req: Request, res: Response) => {
  const userWithTokens = await refreshAuth(req.body.refreshToken);
  res.send({ ...userWithTokens });
});

export const forgotPasswordController = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await generateResetPasswordToken(req.body.email);
  await sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const resetPasswordController = catchAsync(async (req: Request, res: Response) => {
  await resetPassword(req.query['token'], req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

export const setPasswordController = catchAsync(async (req: Request, res: Response) => {
  const user = await checkUser(req.user);
  await updateUserById(user._id, { password: req.body.password });
  res.status(httpStatus.NO_CONTENT).send();
});

export const sendVerificationEmailController = catchAsync(async (req: Request, res: Response) => {
  const user = await checkUser(req.user);
  const verifyEmailToken = await generateVerifyEmailToken(user);
  await sendVerificationEmail(user.email, verifyEmailToken, user.name);
  res.status(httpStatus.NO_CONTENT).send();
});

export const verifyEmailController = catchAsync(async (req: Request, res: Response) => {
  await verifyEmail(req.query['token']);
  res.status(httpStatus.NO_CONTENT).send();
});
