import { Router } from 'express';
import { authController } from './auth.controller';
import { validateBody } from '../../middlewares/validate';
import { signupSchema, loginSchema } from './auth.validation';

const router: Router = Router();

router.post('/signup', validateBody(signupSchema), authController.signup);
router.post('/login', validateBody(loginSchema), authController.login);
router.post('/github', authController.githubLogin);
router.post('/logout', authController.logout);
router.get('/session', authController.getCurrentSession);

export { router as authRoutes };
export default router;
