import { Request, Response } from "express";
import { AuthenticadedRequest } from "../middlewares/auth";
import { favoriteService } from "../services/favoriteService";


export const favoritesController = {
    save: async (req: AuthenticadedRequest, res: Response) => {
        const userId = req.user!.id

        const { courseId } = req.body

        try {
            const favorite = await favoriteService.create(userId, courseId)
            return res.status(201).json(favorite)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    index: async (req: AuthenticadedRequest, res: Response) => {
        const userId = req.user!.id
        try {
            const favorites = await favoriteService.findByUserId(userId)
            return res.json(favorites)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}