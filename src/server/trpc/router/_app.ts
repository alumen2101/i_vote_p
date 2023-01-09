import { router } from "../trpc";
import { professorRouter } from "./professor";
import { voteRouter } from "./vote";

export const appRouter = router({
  professor: professorRouter,
  vote: voteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
