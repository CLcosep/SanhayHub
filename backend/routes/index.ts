import express, { Express, Request, Response, Router } from 'express';
import { usersController } from '../controllers/users/usersController';
import { gradeLevelsController } from '../controllers/gradeLevels/gradeLevelsController';
import passport from 'passport';
import { sectionsControllers } from '../controllers/sections/sectionsController';
import { subjectsControllers } from '../controllers/subjects/subjectsController';
import { topicsControllers } from '../controllers/topics/topicsController';
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.json({ message: "Sanhay Hub API 1.0.1" });
});
router.use('/users', usersController)
router.use('/gradeLevels', gradeLevelsController)
router.use('/sections', sectionsControllers)
router.use('/subjects', subjectsControllers)
router.use('/topics', topicsControllers)
router.use('/auth', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    return res.json(req.user);
});
export default router;

