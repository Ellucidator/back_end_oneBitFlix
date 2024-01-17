import { Response } from "express"
import { AuthenticadedRequest } from "../middlewares/auth"
import { likeService } from "../services/likeService"

export const likesController = {

    save: async (req: AuthenticadedRequest, res: Response) => {
        const userId = req.user!.id
        const { courseId } = req.body
        try {
            const like = await likeService.create(userId, courseId)
            return res.status(201).json(like)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    delete: async (req: AuthenticadedRequest, res: Response) => {
        const userId = req.user!.id
        const { courseId } = req.body
        try {
            await likeService.delete(userId, courseId)
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}