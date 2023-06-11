import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';

import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericRessponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleWrapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
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
  filters: IAcademicSemesterFilters,
  paginationOption: IPaginationOption
): Promise<IGenericRessponse<IAcademicSemester[]>> => {
  // searching query parameters
  const { searchTearm, ...filtersData } = filters;

  // sort  first set for the search

  const andCondition = [];

  if (searchTearm) {
    andCondition.push({
      $or: academicSemesterSearchableFields?.map(fields => ({
        [fields]: {
          $regex: searchTearm,
          $options: 'i',
        },
      })),
    });
  }
  console.log('filtersData', filtersData);
  if (Object?.keys(filtersData)?.length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // details field set for the search
  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTearm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTearm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTearm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];
  // pagination option and sorting
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition?.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicSemester.find(whereCondition)
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

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};
export const academicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
};
