import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";
import { AuthenticadedRequest } from "../middlewares/auth";



export const episodesControler = {
    stream:async(req:Request, res:Response)=>{
        const {videoUrl} = req.query


        try {
            if(!videoUrl) throw new Error("videoUrl is required")

            const range = req.headers.range
            
            episodeService.streamEpisodeToResponse(res, videoUrl.toString(), range)

        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }



    },

    getWatchTime:async(req:AuthenticadedRequest, res:Response)=>{
        const userId = req.user!.id
        const episodeId = req.params.id
        try {
            const watchTime = await episodeService.getWatchTime(userId, episodeId)
            return res.json(watchTime)
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    },

    setWatchTime:async(req:AuthenticadedRequest, res:Response)=>{
        const userId = req.user!.id
        const episodeId = req.params.id
        const {seconds} = req.body
        try {
            const watchTime = await episodeService.setWatchTime({userId, episodeId: Number(episodeId), seconds: Number(seconds)})
            return res.json(watchTime)
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    }
}