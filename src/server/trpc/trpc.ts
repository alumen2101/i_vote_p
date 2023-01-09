/**
 * This is the entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app
 * - we export only the functionality that we use so we can enforce which base procedures should be used
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;
