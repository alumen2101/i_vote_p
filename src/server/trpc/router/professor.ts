import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db/client";
import { getOptionsForVote } from "@/utils/getRandomProf";

export const professorRouter = router({
  add: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(124),
        url: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      const prof = prisma.professor.create({
        data: {
          name: input.name,
          imageUrl: input.url,
        },
      });
      return prof;
    }),

  getProfPair: publicProcedure.query(async () => {
    const [first, second] = getOptionsForVote();

    if (typeof first !== "number" || typeof second !== "number") return;

    const bothProf = await prisma.professor.findMany({
      where: { id: { in: [first, second] } },
    });

    if (bothProf.length !== 2) throw new Error("Failed to find two Professors");

    return { firstProf: bothProf[0], secondProf: bothProf[1] };
  }),
});
