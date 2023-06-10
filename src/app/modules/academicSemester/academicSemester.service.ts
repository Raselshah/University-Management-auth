import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';

import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericRessponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import { academicSemesterTitleWrapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleWrapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async (
  paginationOption: IPaginationOption
): Promise<IGenericRessponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },

    data: result,
  };
};

export const academicSemesterService = {
  createSemester,
  getAllSemester,
};
