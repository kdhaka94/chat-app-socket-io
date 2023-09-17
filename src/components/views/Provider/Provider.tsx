"use client";

import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

export const Provider = ({
  children,
}: {
  children: (ReactNode | Element)[];
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
