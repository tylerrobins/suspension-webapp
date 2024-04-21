import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import session from 'express-session';

import api from './api';
import { notFound, errorHandler } from './middleware/errors.middleware';

dotenv.config();

const app = express();

// REDIS
const redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
	client: redisClient,
	disableTouch: true
});

// SESSION STORAGE
app.use(
	session({
		name: 'qid',
		store: redisStore,
		resave: false,
		saveUninitialized: false,
		secret: 'asdfmsdfoememfmempas',
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years 
			secure: false, // CHANGE IN PROD
			httpOnly: true,
			sameSite: 'lax'
		}
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
	optionsSuccessStatus: 200
}));

app.use(express.static('frontend'))
app.get('/client*', (req: Request, res: Response) =>{
	res.sendFile(path.resolve(__dirname, '../', 'frontend'))
})

app.use('/api', api);

app.use(notFound);
app.use(errorHandler);

export default app;
