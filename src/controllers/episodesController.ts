import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";



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



    }
}