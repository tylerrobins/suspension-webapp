import { Router, Request, Response } from 'express';
import * as argon2 from 'argon2';
import { AppDataSource } from '../../data-source.config';
import User from '../../entities/user.entity';

const router = Router();

router.get('/', (_req: Request, res: Response): Response => {
    return res.status(200).json({
        message: '🙋‍♂️ Users 🙋‍♀️'
    })
});

router.post('/create', async (req: Request, res: Response): Promise<Response> => {
    const email = req.body.email.toString();
    const password = await argon2.hash(req.body.password.toString());

    const userRepository =  AppDataSource.getRepository(User);
    const user: User = userRepository.create({
        email: email,
        password: password
    });
    await userRepository.save(user);
    return res.status(200).json({ 'user created': user });
});

router.post('/login', async (req: Request, res: Response) => {
    let email
    let password
    try {
        email = req.body.email.toString();
        password = req.body.password.toString();
    } catch (err){
        console.error(err)
        return res.status(401).json({success: false,message: "Invalid email or password."});;
    }
    if (!email || !password) {
        return res.status(401).json({success: false,message: "Invalid email or password."});;
    }
    const userRepository = AppDataSource.getRepository(User);
	try {
		const user: User = await userRepository.findOneByOrFail({ email: email });
		if (await argon2.verify(user.password, password)) {
            req.session!.userId = user.id
            console.log("Session after login:", req.session);
			return res.status(200).json({success: true,message: "Login Successful"});
		} else {
			return res.status(401).json({success: false,message: "Invalid email or password."});;
		}
	} catch (err) {
		console.log(err);
	}
	return res.status(401).json({success: false,message: "Invalid email or password."});;
});

router.get('/list' ,async (req: Request, res: Response) => {
    console.log("REQ SESSION: ", req.session.cookie)
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find()
    console.log(users)
    return res.status(200).json(users)
});

export default router;