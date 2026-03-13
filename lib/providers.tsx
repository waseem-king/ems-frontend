"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    // Using a lazy initializer in useState to ensure QueryClient 
    // is only created once on the client.
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Data is considered fresh for 1 minute
                        staleTime: 60 * 1000,
                    },
                },
            })
    );

    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>

    );
}