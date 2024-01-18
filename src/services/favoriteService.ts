import { Favorite } from "../models"

export const favoriteService = {
    create:async(userId: number|string, courseId: number|string)=> {
        const userIdNumber = typeof userId === 'string' ? parseInt(userId, 10) : userId
        const courseIdNumber = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId

        const favorite = await Favorite.create({userId: userIdNumber, courseId: courseIdNumber})
        return favorite
        
    },
    findByUserId: async (userId: number|string) => {
        const userIdNumber = typeof userId === 'string' ? parseInt(userId, 10) : userId
        const favorites = await Favorite.findAll({where: {userId: userIdNumber},attributes:['userId','courseId'],include:{association:'Course', attributes:['id','name','synopsis',['thumbnail_url','thumbnailUrl']]}},)
        return {
            userId,
            courses: favorites.map(favorite => favorite.Course)
        }
    },
    delete: async (userId: number|string, courseId: number|string) => {
        const userIdNumber = typeof userId === 'string' ? parseInt(userId, 10) : userId
        const courseIdNumber = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId
        await Favorite.destroy({where: {userId: userIdNumber, courseId: courseIdNumber}})
    },

    isFavorite: async (userId: number|string, courseId: number|string) => {

        const userIdNumber = typeof userId === 'string' ? parseInt(userId, 10) : userId
        const courseIdNumber = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId
        
        const favorite = await Favorite.findOne({where: {userId: userIdNumber, courseId: courseIdNumber}})
        return favorite?true:false
    }
}