import { createTRPCRouter } from ".";
import { profileRouter, userRouter } from "./routers";

export const appRouter = createTRPCRouter({
  User: userRouter,
  posts: profileRouter,
});

export type AppRouter = typeof appRouter;
