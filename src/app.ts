import cors from 'cors';
import express, { Application } from 'express';
import routes from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

// error handlers

// Application router
// app.get('/', async (req: Request, res: Response) => {
//   //   Promise.reject(new Error('unhandled request'))
//   throw new Error('test error')
// })
app.use('/api/v1/', routes);
export default app;
