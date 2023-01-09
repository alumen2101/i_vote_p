import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { prisma } from "../db/client";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = Record<string, never>;

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  return await createContextInner({});
};

export type Context = inferAsyncReturnType<typeof createContext>;

/**
 * 1. we define the context that is passed to your tRPC procedures. context is data
 * that all of your tRPC pricedure will have access to, and is a great place to put things like db connections, auth info, etc.
 * 
 *    - `createInnerTRPCContext`: this is where you define context which doesnt depend on the request,
 *      e.g. your db connection. you can use this function for integration testing or ssg-helpers where you dont have a request obj
 * 
 *    - `createTRPCContext`: this is where you define contextg which depends on the request, e.g. the user's session. you requestthe session
 *      using the `opts.req` obj, and then pass the session down to the `createInnerTRPCContext` function to create the final context
 * 
 * 2. we initialize tRPC reusable procesures and middlaewares. by convention, you shouldnt export the entire `t`-object but instead,
 * create reusable procedures and middleware and export those.
 */