import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/createAsync';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterService } from './academicSemester.service';
const creatSemesterFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createSemester(
      academicSemesterData
    );
    next();
    // res.status(200).json({
    //   success: true,
    //   message: 'Successfully semester create',
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully semester create',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  creatSemesterFromDB,
};
