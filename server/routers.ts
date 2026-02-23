import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  createReview,
  getApprovedReviews,
  getAllReviews,
  approveReview,
  deleteReview,
} from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  reviews: router({
    // Public: list approved reviews
    list: publicProcedure.query(async () => {
      return getApprovedReviews();
    }),

    // Public: submit a new review (goes to pending)
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2).max(120),
          handle: z.string().max(80).optional(),
          rating: z.number().int().min(1).max(5),
          title: z.string().min(3).max(160),
          body: z.string().min(10).max(2000),
        })
      )
      .mutation(async ({ input }) => {
        await createReview({
          name: input.name,
          handle: input.handle ?? null,
          rating: input.rating,
          title: input.title,
          body: input.body,
          approved: false,
        });
        try {
          await notifyOwner({
            title: `New review from ${input.name}`,
            content: `Rating: ${input.rating}/5\n"${input.title}"\n\n${input.body}`,
          });
        } catch (_) {
          // Notification failure should not block submission
        }
        return { success: true };
      }),

    // Admin: list all reviews (pending + approved)
    adminList: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return getAllReviews();
    }),

    // Admin: approve a review
    approve: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await approveReview(input.id);
        return { success: true };
      }),

    // Admin: delete a review
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await deleteReview(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
