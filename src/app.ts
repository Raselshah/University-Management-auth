import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
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

//global error handler
app.use(globalErrorHandler);

// handle not found api
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
  next();
});

export default app;
