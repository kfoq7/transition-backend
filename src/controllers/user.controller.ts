import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { handleErrorResponse } from '../handler/error.handler'

const userService = new UserService()

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body)

    res.status(201).json(user)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await userService.login(email, password)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    res.json(user)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}
