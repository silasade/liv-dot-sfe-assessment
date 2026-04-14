"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./_local_components/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
