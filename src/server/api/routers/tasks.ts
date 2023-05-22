import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  createTRPCContext,
} from "../trpc";

export const taskRouter = createTRPCRouter({
  infiniteProfileFeed: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.number(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { userId, cursor }, ctx }) => {
      return await getInfiniteTasks({
        ctx,
        cursor,
        whereClause: { userId },
      });
    }),

  infiniteFeed: publicProcedure
    .input(
      z.object({
        onlyFollowing: z.boolean().optional(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.number(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { cursor }, ctx }) => {
      return await getInfiniteTasks({
        ctx,
        cursor,
      });
    }),

  create: protectedProcedure
    .input(z.object({ content: z.any(), user_id: z.number() }))
    .mutation(async ({ input: content, ctx }) => {
      const tasks = await ctx.prisma.task.create({
        data: {
          title: content.content.mainTaskTitle,
          content: content.content.mainTaskDescription,
          userId: ctx.session.user.id as unknown as number,
          published: true,
        },
      });

      return tasks;
    }),

  update: protectedProcedure
    .input(
      z.object({ content: z.any(), user_id: z.number(), taskId: z.number() })
    )
    .mutation(async ({ input: content, ctx }) => {
      const tasks = await ctx.prisma.task.update({
        where: { id: content.taskId },
        data: {
          title: content.content.updMainTaskTitle,
          content: content.content.updMainTaskDescription,
          userId: ctx.session.user.id as unknown as number,
          published: true,
        },
      });

      return tasks;
    }),
});

async function getInfiniteTasks({
  whereClause,
  ctx,
  cursor,
}: {
  whereClause?: Prisma.TaskWhereInput;
  cursor: { id: any; createdAt: Date } | undefined;
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
}) {
  const data = await ctx.prisma.task.findMany({
    cursor: cursor ? { createdAt_id: cursor } : undefined,
    orderBy: [{ id: "asc" }],
    where: whereClause,
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: { name: true, id: true, image: true },
      },
    },
  });

  return {
    tasks: data.map((task) => {
      return {
        id: task.id,
        title: task.title,
        content: task.content,
        createdAt: task.createdAt,
        user: task.author,
      };
    }),
  };
}
