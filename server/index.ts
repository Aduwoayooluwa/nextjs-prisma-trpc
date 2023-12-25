import { publicProcedure, router } from "./trpc";
import { z } from "zod"
import bcrypt from "bcrypt"
import { createUserSchema, loginSchema } from "@/schema/zod-schema";
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

export const appRouter = router({
    getTodos: publicProcedure.query(async () => {
        return await prisma.user.findMany();
    }),
    addTodo: publicProcedure.input(z.string()).mutation(async (options) => {
        await prisma.user.create({
            data: {} as any
        })

    }),
    createAccount: publicProcedure.input(createUserSchema).mutation(async ({ input }) => {
        prisma.$connect();

        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(input.password, saltRounds)
            const newUser = await prisma.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    username: input.username,
                    password: hashedPassword

                }
            })
            return { ...newUser, password: null }
        }
        catch (error) {
            if (error instanceof Error) {
                prisma.$disconnect();
                throw new Error(error.message);

            } else {
                prisma.$disconnect();
                throw new Error('An unexpected error occurred');
            }
        }

    }),
    login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
        const checkUser = await prisma.user.findFirst({
            where: {
                email: input.email
            }
        })

        if (!checkUser) {
            throw new Error("Invalid Credential: Email");
        }

        // comparing the submitted password with the db
        const isPasswordValid = await bcrypt.compare(input.password, checkUser.password)

        if (!isPasswordValid) {
            throw new Error("Invalid Credentials")
        }
        return { ...checkUser, password: null }
    })
})


export type AppRouter = typeof appRouter;

