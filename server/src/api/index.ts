import { Router, Request, Response, } from 'express';
import v1Router from './v1';

const router = Router();

router.get('/', (_req: Request, res: Response): Response =>{
    return res.status(200).json({
        message: '🚙 API ROUTE 🚗'
    })
})

router.use('/v1', v1Router)

export default router;