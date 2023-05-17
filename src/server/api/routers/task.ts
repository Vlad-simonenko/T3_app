import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import {
  createTRPCContext,
  createTRPCRouter,
  prisma,
  protectedProcedure,
  publicProcedure,
} from "y/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getById: publicProcedure.query(() => {
    return prisma.task.findMany();
  }),
});
