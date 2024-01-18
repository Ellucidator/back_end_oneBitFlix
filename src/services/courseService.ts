import { Op } from "sequelize";
import { Course } from "../models";


export const courseService = {

    findByIdWithEpisodes:async(courseId:number|string) =>{
        const course = await Course.findByPk(courseId, {
            include: {
                association:'episodes',
                attributes: ['id', 'name', 'synopsis',['video_url','videoUrl'],['seconds_long','secondsLong']],
                order: [['order', 'ASC']],
                separate: true
            },
            attributes: ['id', 'name', 'synopsis']
        })
        return course
    },

    getRamdonFeaturedCourses:async():Promise<Course[]>=>{
        const randomCourses = await Course.findAll({
            where: {
                featured: true
            },
            attributes:['id', 'name', 'synopsis', ['thumbnail_url','thumbnailUrl']]
        })

        const featuredRandomCourses = randomCourses.sort(()=> Math.random() - 0.5).slice(0,3)

        return featuredRandomCourses
    },

    getCoursesNewest:async():Promise<Course[]>=>{
        const newestCourses = await Course.findAll({
            order:[['id', 'DESC']],
            attributes:['id', 'name', 'synopsis', ['thumbnail_url','thumbnailUrl']],
            limit: 10
        })
        return newestCourses
    },

    findByName: async (name: string, page: number, perPage: number) => {
        const offset = (page - 1) * perPage
        const { count, rows } = await Course.findAndCountAll({
            attributes: ['id', 'name', 'synopsis', ['thumbnail_url','thumbnailUrl']],
            where: {
                name:{
                    [Op.iLike]: `%${name}%`
                }
            },
            limit: perPage,
            offset
        })

        return {
            courses: rows,
            page,
            perPage,
            total: count
        }
    }
}