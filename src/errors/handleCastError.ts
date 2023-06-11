import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

export const handlecastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err.path,
      message: 'Invalid Object id',
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'cast error',
    errorMessage: errors,
  };
};
