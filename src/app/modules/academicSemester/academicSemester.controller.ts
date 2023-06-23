import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginatonField } from '../../../constance/pagination';
import catchAsync from '../../../shared/createAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  academicSemesterFitarableFields,
  IAcademicSemester,
} from './academicSemester.interface';
import { academicSemesterService } from './academicSemester.service';
const creatSemesterFromDB = catchAsync(async (req: Request, res: Response) => {
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
});

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFitarableFields);
  const paginationOptions = pick(req.query, paginatonField);

  const result = await academicSemesterService.getAllSemester(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await academicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully !',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await academicSemesterService.updateSemester(id, updateData);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters Updated successfully !',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await academicSemesterService.deleteSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully !',
    data: result,
  });
});
export const AcademicSemesterController = {
  creatSemesterFromDB,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
