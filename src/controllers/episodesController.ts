import { Request, Response } from "express";
import fs from "fs";
import path from "path";


export const episodesControler = {
    stream:async(req:Request, res:Response)=>{
        try {
            const {videoUrl} = req.query
            if(!videoUrl) throw new Error("videoUrl is required")

            const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl.toString())
            const fileStat = fs.statSync(filePath)

            const range = req.headers.range

            if(range){
                const parts = range.replace(/bytes=/, "").split("-")

                const start = parseInt(parts[0], 10)
                const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1

                const chunksize = (end - start) + 1
                const file = fs.createReadStream(filePath, {start, end})
                
                const head = {
                    "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": "video/mp4"
                }
                res.writeHead(206, head)

                file.pipe(res)
            }else{
                const head = {
                    "Content-Length": fileStat.size,
                    "Content-Type": "video/mp4"
                }
                res.writeHead(200, head)
                fs.createReadStream(filePath).pipe(res)
            }
            
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    }
}