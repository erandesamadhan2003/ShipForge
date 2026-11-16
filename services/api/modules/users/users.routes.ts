import { Router } from 'express';
import { usersController } from './users.controller';
import { validateBody, validateParams } from '../../middlewares/validate';
import { updateUserSchema, userIdParamSchema } from './users.validation';

const router: Router = Router();

router.get('/me', usersController.getCurrentUser);
router.get('/:id', validateParams(userIdParamSchema), usersController.getProfile);
router.patch(
  '/:id',
  validateParams(userIdParamSchema),
  validateBody(updateUserSchema),
  usersController.updateProfile
);

export { router as usersRoutes };
export default router;
