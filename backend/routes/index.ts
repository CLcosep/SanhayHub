import express, { Express, Request, Response, Router } from 'express';
import { userController } from '../controllers/users/usersController';
import { gradeLevelsController } from '../controllers/gradeLevels/gradeLevelsController';
import passport from 'passport';
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.json({ message: "Sanhay Hub API 1.0.1" });
});
router.use('/users', userController)
router.use('/gradeLevel', gradeLevelsController)
export default router;