"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

import { trpc } from "./_trpc/client";

export default function GeneralProvider({ children }: {
    children : React.ReactNode
}) {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() => {
        return trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:3000/api/trpc",
                }),
            ]
        })
    })

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                { children }
            </QueryClientProvider>
        </trpc.Provider>
    )
}