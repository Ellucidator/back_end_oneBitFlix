import { Response } from "express";
import { AuthenticadedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

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
    },

    update:async(req:AuthenticadedRequest,res:Response)=>{
        const userId = req.user!.id
        const {firstName, lastName, phone, birth, email} = req.body
        try {
            const user = await userService.update(userId, {firstName, lastName, phone, birth, email})
            return res.json(user)
        } catch (error) {
            if(error instanceof Error) {
                return res.status(400).json({message: error.message})
            }
        }
    }
}