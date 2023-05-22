import { createTRPCRouter } from "~/server/api/trpc";
import { taskRouter } from "./routers/tasks";

export const appRouter = createTRPCRouter({
  task: taskRouter,
});

export type AppRouter = typeof appRouter;
