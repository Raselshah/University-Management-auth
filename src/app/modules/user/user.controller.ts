import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/createAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
const createUserFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);

    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully created user',
      data: result,
    });
  }
);

export const UserController = {
  createUserFromDB,
};
