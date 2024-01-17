import { Like } from "../models"


export const likeService = {
    create: async (userId: number|string, courseId: number|string) => {

        const userIdNumber = typeof userId === 'string' ? parseInt(userId, 10) : userId
        const courseIdNumber = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId
        
        const like = await Like.create({userId: userIdNumber, courseId: courseIdNumber})
        
        return like
    },

    delete: async (userId: number|string, courseId: number|string) => {
        const userIdNumber = typeof userId === 'string' ? parseInt(userId, 10) : userId
        const courseIdNumber = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId
        await Like.destroy({where: {userId: userIdNumber, courseId: courseIdNumber}})
    }
}