import express, { Express, Request, Response, Router } from 'express';
import { userController } from '../controllers/users/usersController';
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.json({ message: "Sanhay Hub API 1.0.1" });
});
router.use('/users', userController)
export default router;