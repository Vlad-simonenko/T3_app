import { createTRPCRouter } from ".";
import { profileRouter, taskRouter } from "./routers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  task: taskRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
