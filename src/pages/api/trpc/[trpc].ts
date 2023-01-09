import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server.mjs";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});


/**
 * This is the entry point for you API and exposes the tRPC router
 * use this to enable CORS, middleware, ...
 * the exposed `createNextApiHandler` is a Next.js API handler which takes a request and reponse object.
 * this means that you can wrap the `createNextApiHandler` in any middleware you want.
 */