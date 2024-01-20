import { Response } from "express";
import { AuthenticadedRequest } from "../middlewares/auth";

export const userController = {
    

    show:async(req:AuthenticadedRequest,res:Response)=>{

        const currentUser = req.user

        try {
            return res.json(currentUser)
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    }
}