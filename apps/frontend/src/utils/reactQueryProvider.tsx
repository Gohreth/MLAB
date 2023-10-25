"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type IReactQueryProviderProps = {
  children: ReactNode;
};

export default function ReactQueryProvider({
  children,
}: IReactQueryProviderProps) {
  const [client] = useState(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
