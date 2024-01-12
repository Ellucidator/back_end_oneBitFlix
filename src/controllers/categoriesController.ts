// src/controllers/categories-controller.ts

import { Request, Response } from 'express'
import { getPaginationParams } from '../helpers/getPaginationParams'
import { categoryService } from '../services/categoryService'
import { Category, Course } from '../models'

const categoriesController = {
    index: async (req: Request, res: Response) => {
        const [page, perPage] = getPaginationParams(req.query)

        try {
            const paginatedCategories = await categoryService.findAllPaginated(page, perPage)

            return res.json(paginatedCategories)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const category = await Category.findByPk(id, {
                include: {
                    association: 'courses',
                    attributes:['id','name','synopsis',['thumbnail_url','thumbnailUrl']]
                },
                attributes: ['id', 'name']
            })
            return res.json(category)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}

export {categoriesController}