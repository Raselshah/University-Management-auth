import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterZodValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(
    AcademicSemesterZodValidation.createAcademicSemesterZodSchema
  ),
  AcademicSemesterController.creatSemesterFromDB
);

router.get('/:id', AcademicSemesterController.getSingleSemester);
router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterZodValidation.updateAcademicSemesterZodSchema
  ),
  AcademicSemesterController.updateSemester
);
router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoute = router;
