import { Request, Response } from "express";
import { courseService } from "../services/courseService";
import { throws } from "assert";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const coursesController = {
    show: async (req:Request, res:Response) => {
        try {
            const { id } = req.params
            const course = await courseService.findByIdWithEpisodes(id)
            return res.json(course)
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