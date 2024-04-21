import app from './app'
import { AppDataSource } from './data-source.config';

const port = process.env.PORT || 8080;

const main = async () => {
    await AppDataSource.initialize()
        .then(() => {
            console.log('CONNECTED TO DB')
        }).catch((err: Error) => {
            console.error('DB ERROR: ', err);
        });
    app.listen(port, ()=> {
        process.env.NODE_ENV === 'production' ? console.log(`Server is up at port ${port}`) : console.log(`Server is up at http://localhost:${port}`);
    })
}

main().catch((err) => {
    console.error(err);
});