import { Request, Response } from 'express'
import usersService from './users.service'
const createUserFromDB = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'Successfully created user',
      data: result,
    })
  } catch (err) {
    res.status(400).json({ success: false, message: 'faild to user create' })
  }
}

export default {
  createUserFromDB,
}
