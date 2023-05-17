import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { AppRouter } from "y/server";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if ("postgresql://nestAuth:nestAuth@localhost:5432/nestAuth?schema=public")
    return `postgresql://nestAuth:nestAuth@localhost:5432/nestAuth?schema=public`; // SSR should use vercel url
  return `http://localhost:${3000 || 3001}`; // dev SSR should use localhost
};

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `http://localhost:3001/api`, //docker-container ip ???????
        }),
      ],
    };
  },
  ssr: false,
});

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
