import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";
import jwt from 'jsonwebtoken'

export interface AuthenticadedRequest extends Request {
    user?: UserInstance|null
}

export  function ensureAuth(req:AuthenticadedRequest,res:Response,next:NextFunction) {
    const tokenAuthorization = req.headers.authorization

    if(!tokenAuthorization) return res.status(401).json({message: 'Token not found'})
    const token = tokenAuthorization.replace(/Bearer /, '')

    jwtService.verifyToken(token, (err, decoded) => {
        if(err || typeof decoded === 'undefined') return res.status(401).json({message: 'Invalid token'})

        userService.findByEmail((decoded as JwtPayload).email).then(user => {
            req.user = user
            next()
        })
    })

}

export function ensureAuthViaQuery(req:AuthenticadedRequest,res:Response,next:NextFunction) {

    const {token} = req.query
    if(!token) return res.status(401).json({message: 'Token not found'})
    if(typeof token !== 'string') return res.status(401).json({message: 'Parameter token must be a string'})

    jwtService.verifyToken(token, (err, decoded) => {
        if(err || typeof decoded === 'undefined') return res.status(401).json({message: 'Invalid token'})

        userService.findByEmail((decoded as JwtPayload).email).then(user => {
            req.user = user
            next()
        })
    })


    }