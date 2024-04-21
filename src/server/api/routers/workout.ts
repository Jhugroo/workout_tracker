import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const workoutRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createWorkout: publicProcedure
    .input(z.array(z.object({
      order: z.number().nullable(),
      sets: z.array(z.object({
        name: z.string().min(1),
        reps: z.string().min(1),
      }))
    }))
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      const workout = await ctx.db.workout.createMany({
        data: {
          ...input
        }
      });

      return { week: workout };
    }),
  addWeek: publicProcedure.input(z.object({
    order: z.number().nullable()
  }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.week.create({
        data: {
          order: input.order ?? 0
        }
      })
    }),
  deleteWeek: publicProcedure.input(z.object({
    id: z.number()
  }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.week.delete({
        where: {
          ...input
        }
      })
    }),
  getWeeks: publicProcedure.query(({ ctx }) => {
    return ctx.db.week.findMany({
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
