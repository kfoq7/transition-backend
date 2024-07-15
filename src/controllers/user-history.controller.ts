import { Request, Response } from 'express'
import { UserHistoryService } from '../services/user-history.routes.service'
import { handleErrorResponse } from '../handler/error.handler'

const userHistoryService = new UserHistoryService()

export const getUserHistoryRoutes = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const favorites = await userHistoryService.getUserHistoryRoutes(Number(userId))

    return res.status(200).json(favorites)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export const createUserHistoryRoutes = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const userHistory = await userHistoryService.createUserHistoryRoutes(Number(userId), req.body)

    res.status(201).json(userHistory)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}
