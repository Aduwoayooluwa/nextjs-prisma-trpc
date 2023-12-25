import { publicProcedure, router } from "./trpc";
import bcrypt from "bcrypt";
import { createUserSchema, loginSchema } from "@/schema/zod-schema";
import { prisma } from "../prisma";

export const appRouter = router({
    // Procedure to create a new user account
    createAccount: publicProcedure.input(createUserSchema).mutation(async ({ input }) => {
        // Establish a connection to the database (Prisma manages connection pooling)
        await prisma.$connect();

        try {
            // Define the number of salt rounds for hashing
            const saltRounds = 10;
            // Hash the user's password for secure storage
            const hashedPassword = await bcrypt.hash(input.password, saltRounds);

            // Create the new user in the database
            const newUser = await prisma.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    username: input.username,
                    password: hashedPassword,
                },
            });

            // Return the new user data excluding the password for security
            return { ...newUser, password: null };
        } catch (error) {
            // Disconnect from the database in case of an error
            await prisma.$disconnect();

            // Error handling
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unexpected error occurred');
            }
        }
    }),

    // Procedure to handle user login
    login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
        try {
            // Find the user by their email
            const checkUser = await prisma.user.findFirst({
                where: {
                    email: input.email,
                },
            });

            // If user not found, throw a custom error
            if (!checkUser) {
                throw new Error("Invalid Credential: Email");
            }

            // Compare the submitted password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(input.password, checkUser.password);

            // If the password is invalid, throw a custom error
            if (!isPasswordValid) {
                throw new Error("Invalid Credentials");
            }

            // Return the user data excluding the password for security

            return { message: "Account found", name: checkUser.name, email: checkUser.email, id: checkUser.id, username: checkUser.username };
        } catch (error) {
            // Handle any unexpected errors during the login process
            if (error instanceof Error) {
                // Log the error for debugging purposes (or handle it as needed)
                console.error("Login error:", error.message);

                // Re-throw the error to be handled by the caller or a higher-level error handler
                throw new Error("An error occurred during the login process");
            } else {
                // Handle non-Error cases (less common)
                throw new Error("An unexpected error occurred");
            }
        }
    }),

})

export type AppRouter = typeof appRouter;
