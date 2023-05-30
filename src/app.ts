import cors from 'cors'
import express, { Application } from 'express'
import usersRouter from './app/modules/users/users.route'

const app: Application = express()

app.use(express.json())
app.use(cors())

// Application router

app.use('/api/v1/users', usersRouter)
// app.get('/', async (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

export default app
