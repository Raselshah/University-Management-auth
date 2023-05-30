import express from 'express'
import userscontroller from './users.controller'
const router = express.Router()

router.post('/create-user', userscontroller.createUserFromDB)

export default router
