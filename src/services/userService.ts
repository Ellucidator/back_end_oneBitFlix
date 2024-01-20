import { Course, Episode, User, WatchTime } from "../models"
import { UserCreationAttributes } from "../models/User"

export const userService = {
    
    findByEmail: async (email: string) => {
        const user = await User.findOne({where: {email}})
        return user
    },

    create: async (attributes:UserCreationAttributes) => {
        const user = await User.create(attributes)
        return user
    },

    watchingList:async (userId:number|string)=>{
        const watchingListUser= await User.findByPk(userId,{
            include:
                {
                    model:Episode,
                    attributes:['id','name','synopsis',['video_url','videoUrl'],['seconds_long','secondsLong']],
                    include:[{
                        model:Course,
                        attributes:['id','name','synopsis',['thumbnail_url','thumbnailUrl']],
                    }],
                    through:{
                        as:'watchTime',
                        attributes:['seconds']
                    }
                }
            ,
            attributes:['id','firstName']
        })


        return watchingListUser
    }
}