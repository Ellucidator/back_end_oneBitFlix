import { Request, Response } from "express"
import { Category } from "../models"
import { CategoryInstance } from "../models/Category"


export const categoriesController = {

    index: async(req:Request,res:Response) => {
        try {
            const categories:CategoryInstance[] = await Category.findAll({
                order: [['position', 'ASC']],
                attributes: ['id', 'name', 'position']
            })
            res.json(categories)
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({
                    error: error.message
                })
            }
        }
    }

}