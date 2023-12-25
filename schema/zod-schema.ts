import { z } from "zod"

export const createUserSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string().optional(),
    username: z.string()

})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})