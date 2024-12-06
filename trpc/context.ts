import { createTRPCContext } from "@trpc/server";
import { type inferAsyncReturnType } from "@trpc/server";

export const createContext = async () => {
    const session = await getSession();
    const ctx = {
        session,
    }

    return ctx;
};

export type Context = typeof createContext;