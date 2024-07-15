import { Router } from 'express'
import {
  createUserHistoryRoutes,
  getUserHistoryRoutes
} from '../controllers/user-history.controller'

const router = Router()

router.get('/:userId', getUserHistoryRoutes)

router.post('/:userId', createUserHistoryRoutes)

export { router }
