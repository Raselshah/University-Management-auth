import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';
const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const { user } = req.body
      // const result = await UserService.createUser(user)
      // res.status(200).json({
      //   success: true,
      //   message: 'Successfully created user',
      //   data: result,
      // });
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      next();
    } catch (error) {
      // res.status(400).json({ success: false, message: 'faild to user create' })
      next(error);
    }
  };

export default validateRequest;
