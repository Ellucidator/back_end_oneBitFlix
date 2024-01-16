import { Favorite } from "../models"

export const favoriteService = {
    create:async(userId: number|string, courseId: number|string)=> {
        const userIdNumber = typeof userId === 'string' ? parseInt(userId, 10) : userId
        const courseIdNumber = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId

        const favorite = await Favorite.create({userId: userIdNumber, courseId: courseIdNumber})
        return favorite
        
    }
}