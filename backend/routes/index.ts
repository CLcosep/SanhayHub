import express, { Express, Request, Response, Router } from 'express';
import { usersController } from '../controllers/users/usersController';
import { gradeLevelsController } from '../controllers/gradeLevels/gradeLevelsController';
import passport from 'passport';
import { sectionsControllers } from '../controllers/sections/sectionsController';
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.json({ message: "Sanhay Hub API 1.0.1" });
});
router.use('/users', usersController)
router.use('/gradeLevels', gradeLevelsController)
router.use('/sections', sectionsControllers)
export default router;