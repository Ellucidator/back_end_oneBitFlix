import { Course } from "../models";


export const courseService = {

    async findByIdWithEpisodes(id:string) {
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
    }
}