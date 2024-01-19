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
    
    getTopTenByLikes:async()=>{
        const result = await Course.sequelize?.query(
            `SELECT 
                courses.id, 
                courses.name, 
                courses.synopsis, 
                courses.thumbnail_url AS thumbnailUrl,
                COUNT(users.id) AS likes
            FROM courses
            LEFT OUTER JOIN likes
                ON likes.course_id = courses.id
                INNER JOIN users
                    ON users.id = likes.user_id
            GROUP BY courses.id
            ORDER BY likes DESC
            LIMIT 10`,
        )

        if(result){
            const [topTen] = result

            return topTen
        }else{
            return null
        }
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