import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db/client";

export const voteRouter = router({
  castVote: publicProcedure
    .input(
      z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const voteInDb = await prisma.vote.create({
        data: {
          votedForId: input.votedFor,
          votedAgainstId: input.votedAgainst,
        },
      });
      return { success: true, vote: voteInDb };
    }),
});
