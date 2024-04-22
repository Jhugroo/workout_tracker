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

  createSets: publicProcedure
    .input(
      z.array(
        z.object({
          name: z.string().min(1),
          reps: z.string().min(1),
          Workout: z.object({
            connect: z.object({
              id: z.number()
            })
          }).nullable(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      for (const singleInput of input) {
        await ctx.db.set.create({
          data: {
            name: singleInput.name,
            reps: singleInput.reps,
            Workout: {
              connect: {
                id: singleInput.Workout?.connect.id
              }
            }
          }
        });
      }
      return { success: "success" };
    }),
  getSets: publicProcedure.input(z.object({
    workoutId: z.number().nullable()
  })).query(({ ctx, input }) => {
    return ctx.db.set.findMany({
      where: {
        ...input
      }
    });
  }),
  addWorkout: publicProcedure.input(z.object({
    order: z.number().nullable(),
    weekId: z.number(),
  }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.workout.create({
        data: {
          order: input.order ?? 1,
          Week: {
            connect: {
              id: input.weekId
            }
          }
        }
      })
    }),
  deleteWorkout: publicProcedure.input(z.object({
    id: z.number()
  })).mutation(async ({ ctx, input }) => {
    return await ctx.db.workout.delete({
      where: {
        ...input
      }
    })
  }),
  getWorkouts: publicProcedure.input(z.object({
    weekId: z.number().nullable()
  })).query(({ ctx, input }) => {
    return ctx.db.workout.findMany({
      where: {
        ...input
      }
    });
  }),
  addWeek: publicProcedure.input(z.object({
    order: z.number().nullable()
  }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.week.create({
        data: {
          order: input.order ?? 1
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

    return ctx.db.week.findMany();
  }),
  getAllWorkouts: publicProcedure.query(({ ctx }) => {
    return ctx.db.week.findMany({
      orderBy: {
        order: "asc"
      },
      include: {
        workouts: {
          orderBy: {
            order: "asc"
          },
          include: {
            sets: true,

          }
        }
      }
    });
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
