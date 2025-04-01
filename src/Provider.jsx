import { HeroUIProvider } from "@heroui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import MaintenanceDetailsModal from "./components/maintenance-details-modal";
import { store } from "./store";

const queryClient = new QueryClient();

export default function Provider({ children }) {
  const { resolvedTheme } = useTheme();

  return (
    <ReduxProvider store={store}>
      <HeroUIProvider>
        <ToastContainer position="top-center" rtl theme={resolvedTheme} />
        <Toaster richColors dir="rtl" duration={3000} theme={resolvedTheme} />
        <QueryClientProvider client={queryClient}>
          {children}
          <MaintenanceDetailsModal />
        </QueryClientProvider>
      </HeroUIProvider>
    </ReduxProvider>
  );
}
