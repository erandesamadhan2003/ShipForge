import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { authService, AuthService } from './auth.service';
import { sendOK, sendCreated } from '../../utils/responses';
import type { SignupDTO, LoginDTO } from './auth.types';

export class AuthController {
  constructor(private readonly service: AuthService = authService) {}

  signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password, username } = req.body as SignupDTO;
    const result = await this.service.signup({ email, password, username });
    sendCreated(res, result, 'User registered successfully');
  });

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as LoginDTO;
    const result = await this.service.login({ email, password });
    sendOK(res, result, 'Login successful');
  });

  githubLogin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { code } = req.body as { code: string };
    const session = await this.service.loginWithGitHub(code);
    sendOK(res, session, 'Login successful');
  });

  logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.replace('Bearer ', '') ?? '';
    await this.service.logout(token);
    sendOK(res, null, 'Logout successful');
  });

  getCurrentSession = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.replace('Bearer ', '') ?? '';
    const session = await this.service.getSession(token);
    sendOK(res, session, 'Session retrieved');
  });
}

export const authController = new AuthController();
export default authController;
