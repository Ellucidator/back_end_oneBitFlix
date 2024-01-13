import { Course } from "../models";


export const courseService = {

    findByIdWithEpisodes:async(id:string) =>{
        const course = await Course.findByPk(id, {
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
    }
}