import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps, ...rest }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  // const client = new QueryClient({
  //   defaultOptions: {
  //     queries: { refetchOnWindowFocus: false },
  //   },
  // });
  // 최상단에 QueryClientProvider
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
