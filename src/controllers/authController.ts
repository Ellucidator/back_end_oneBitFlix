import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";


export const authController = {
    register: async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, phone, birth } = req.body

        try {
            const userAlreadyExists = await userService.findByEmail(email)
            if (userAlreadyExists) throw new Error('Email already exists')

            const newUser = await userService.create({ firstName, lastName, email, password, phone, birth, role: 'user' })
            return res.status(201).json(newUser)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    login: async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const user = await userService.findByEmail(email)
            if (!user) throw new Error('Email not found')

            user.checkPassword(password, (err, isSame) => {
                if (err) return res.status(400).json({ message: err.message })
                if (!isSame)return res.status(400).json({ 'message': 'Invalid password' })

                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email:user.email
                }
                const token = jwtService.singToken(payload, '8h')

                return res.status(200).json({ authenticated: true,user,token })
            })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}