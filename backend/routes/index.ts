import express, {Express, Request, Response, Router} from 'express';
import userRouter from './userRouter';
const router:Router = express.Router();

router.get('/',(req:Request,res:Response) => {
    return  res.json({message:"Sanhay Hub API 1.0.0"});
});
router.use('/user',userRouter);

export default router;