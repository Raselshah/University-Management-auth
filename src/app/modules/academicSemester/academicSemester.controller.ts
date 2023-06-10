import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginatonField } from '../../../constance/pagination';
import catchAsync from '../../../shared/createAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterService } from './academicSemester.service';
const creatSemesterFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createSemester(
      academicSemesterData
    );

    // res.status(200).json({
    //   success: true,
    //   message: 'Successfully semester create',
    //   data: result,
    // });

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully semester create',
      data: result,
    });
    next();
  }
);

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, ['searchTearm']);
    const paginationOption = pick(req.query, paginatonField);

    const result = await academicSemesterService.getAllSemester(
      filters,
      paginationOption
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully get all semesters',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);
export const AcademicSemesterController = {
  creatSemesterFromDB,
  getAllSemesters,
};
