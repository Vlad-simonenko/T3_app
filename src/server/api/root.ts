import { createTRPCRouter } from "~/server/api/trpc";
import { taskRouter } from "./routers/tasks";
import { usersRouter } from "./routers/users";

export const appRouter = createTRPCRouter({
  task: taskRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
