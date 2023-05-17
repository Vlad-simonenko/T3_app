import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import {
  createTRPCContext,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "y/server";
import { z } from "zod";

export const taskRouter = createTRPCRouter({
  infiniteProfileFeed: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().optional(),
        cursor: z.object({ id: z.string() }).optional(),
      })
    )
    .query(async ({ input: { limit = 10, userId, cursor }, ctx }) => {
      return await getInfinitetasks({
        limit,
        ctx,
        cursor,
        whereClause: { userId } as any,
      });
    }),
  infiniteFeed: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      const currentUserId = ctx.session?.user.id;
      return await getInfinitetasks({
        limit,
        ctx,
        cursor,
        whereClause:
          currentUserId == null
            ? undefined
            : {
                authorId: {},
              },
      });
    }),
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      const task = await ctx.prisma.task.create({
        data: { content, authorId: ctx.session.user.id } as any,
      });

      void ctx.revalidateSSG?.(`/profiles/${ctx.session.user.id}`);

      return task;
    }),
});

async function getInfinitetasks({
  whereClause,
  ctx,
  limit,
  cursor,
}: {
  whereClause?: Prisma.TaskWhereInput;
  limit: number;
  cursor: { id: any } | undefined;
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
}) {
  const data = await ctx.prisma.task.findMany({
    take: limit + 1,
    where: whereClause,
    select: {
      id: true,
      content: true,
      title: true,
      published: true,
      authorId: true,
    },
  });

  let nextCursor: typeof cursor | undefined;
  if (data.length > limit) {
    const nextItem = data.pop();
    if (nextItem != null) {
      nextCursor = { id: nextItem.id } as any;
    }
  }

  return {
    tasks: data.map((task: any) => {
      return {
        id: task.id,
        title: task.title,
        content: task.content,
        published: task.published,
        authorId: task.authorId,
      };
    }),
    nextCursor,
  };
}
