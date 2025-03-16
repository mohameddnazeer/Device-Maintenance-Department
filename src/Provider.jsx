import { HeroUIProvider } from "@heroui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function Provider({ children }) {
  const { resolvedTheme } = useTheme();

  return (
    <HeroUIProvider>
      <ToastContainer position="top-center" rtl theme={resolvedTheme} />
      <Toaster richColors dir="rtl" duration={3000} theme={resolvedTheme} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </HeroUIProvider>
  );
}
