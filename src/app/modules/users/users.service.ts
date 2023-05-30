import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generate password incrementally

  // default password

  const id = await generateUserId()
  user.id = id

  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('user creation failed!!')
  }
  return createdUser
}

export default {
  createUser,
}
