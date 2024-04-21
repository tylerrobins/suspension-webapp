import { DataSource } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true, //This will auto create schema, should be false in production
    logging: true,
    entities: [path.join(__dirname, '/entities/**/*.entity.{ts,js}')],
    migrations: [path.join(__dirname, 'migrations', '*')]
})