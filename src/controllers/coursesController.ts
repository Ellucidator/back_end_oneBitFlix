import { Request, Response } from "express";
import { courseService } from "../services/courseService";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticadedRequest } from "../middlewares/auth";
import { likeService } from "../services/likeService";
import { favoriteService } from "../services/favoriteService";

export const coursesController = {
    show: async (req:AuthenticadedRequest, res:Response) => {
        const userId = req.user!.id
        try {
            const courseId = req.params.id

            const course = await courseService.findByIdWithEpisodes(courseId)
            if(course){
                const liked = await likeService.isLiked(userId, courseId)
                const favorited = await favoriteService.isFavorite(userId, courseId)

                return res.json({...course.get(), liked, favorited})
            }
            
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    },

    featured:async(req:Request, res:Response) => {
        try {
            const courses = await courseService.getRamdonFeaturedCourses()
            return res.json(courses)
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    },

    newest:async(req:Request, res:Response) => {
        try {
            const courses = await courseService.getCoursesNewest()
            return res.json(courses)
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    },

    search:async(req:Request, res:Response) => {
        try {
            const { name} = req.query
            const [pageNumber, perPageNumber] = getPaginationParams(req.query)


            if(!name) throw new Error()
            const courses = await courseService.findByName(name.toString(), pageNumber, perPageNumber)
            return res.json(courses)
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    }
}