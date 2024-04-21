import { Router, Request, Response } from 'express';

import userRoute from './user.route';

const router  = Router()

router.get('/', (_req: Request, res: Response): Response => {
    return res.status(200).json({
        message: '1️⃣ - API VERSION 1.'
    })
});

router.use('/user',userRoute);

export default router;