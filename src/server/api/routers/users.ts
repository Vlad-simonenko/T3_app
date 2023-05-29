import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  createTRPCContext,
} from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAllUsers: publicProcedure
    .input(
      z.object({
        cursor: z.object({ id: z.number(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { cursor }, ctx }) => {
      const profile = await ctx.prisma.user.findMany({
        select: {
          name: true,
          image: true,
          _count: { select: { tasks: true } },
        },
      });

      if (profile == null) return;

      return await getUsers({
        ctx,
        cursor,
      });
    }),
});
async function getUsers({
  ctx,
  cursor,
}: {
  whereClause?: Prisma.UserSelect;
  cursor: { id: any; createdAt: Date } | undefined;
  ctx: inferAsyncReturnType<typeof createTRPCContext>;
}) {
  const data = await ctx.prisma.user.findMany({
    orderBy: [{ id: "asc" }],
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
  return {
    users: data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        image: user.image,
      };
    }),
  };
}
