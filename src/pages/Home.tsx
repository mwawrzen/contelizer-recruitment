import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

function Home() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main className="flex justify-center p-6">
        <Outlet />
      </main>
      </QueryClientProvider>
    </>
  );
}

export default Home;
