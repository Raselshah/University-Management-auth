import { User } from './users.model'

export const generateUserId = async () => {
  //   prevId++
  //   return String(prevId).padStart(5, '0')

  const userId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  const incrementId = (parseInt(userId) + 1).toString().padStart(5, '0')
  return incrementId
}

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return lastUser?.id
}
