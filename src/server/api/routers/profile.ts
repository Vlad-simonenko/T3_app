import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "y/server";
import { z } from "zod";

export const profileRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id }, ctx }) => {
      const profile = await ctx.prisma.user.findUnique({
        where: { id },
        select: {
          name: true,
          email: true,
        },
      });

      if (profile == null) return;

      return {
        name: profile.name,
        email: profile.email,
      };
    }),

  toggleFollow: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .mutation(async ({ input: { userId }, ctx }) => {
      const currentUserId = ctx.session.user.id;
      const existingFollow = await ctx.prisma.user.findFirst({
        where: { id: userId },
      });

      let addedFollow;
      if (existingFollow == null) {
        await ctx.prisma.user.update({
          where: { id: userId },
          data: { tasks: { connect: { id: currentUserId } } as any },
        });
        addedFollow = true;
      } else {
        await ctx.prisma.user.update({
          where: { id: userId },
          data: { tasks: { connect: { id: currentUserId } } as any },
        });
        addedFollow = false;
      }

      void ctx.revalidateSSG?.(`/profiles/${userId}`);
      void ctx.revalidateSSG?.(`/profiles/${currentUserId}`);

      return { addedFollow };
    }),
});
