import { Router } from "express";
import userController from '../controllers/userController';
const router:Router = Router();
// user/
router.get("/",userController.findOne);

// user/setting
router.get("/setting")

export default router;