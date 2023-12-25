// Import the `initTRPC` function from the `@trpc/server` package
import { initTRPC } from "@trpc/server";

// Initialize tRPC and create a context for defining routers and procedures
// The `create` method sets up the necessary configuration for tRPC
const t = initTRPC.create();

// Export a `router` function from tRPC context
// This function is used to create new tRPC routers, 
// which are the core building blocks of a tRPC API and define API routes and procedures
export const router = t.router;

// Export a `publicProcedure` function from tRPC context
// This function is used to create new tRPC procedures, 
// which define individual API endpoints and their logic, without requiring authentication
export const publicProcedure = t.procedure;
