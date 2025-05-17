import { toast } from "sonner";
import { handleApiError, toastPromise } from "../utils/errorHandler";
export const useToast = () => {
  const showError = (error, duration = 5000) => {
    handleApiError(error, duration);
  };

  const showSuccess = (message, duration = 5000) => {
    toast.success(message, { duration });
  };

  const showInfo = (message, duration = 5000) => {
    toast.info(message, { duration });
  };

  const showWarning = (message, duration = 5000) => {
    toast.warning(message, { duration });
  };

  const promiseToast = (promise, { loading, success, duration = 5000 }) => {
    return toastPromise(promise, { loading, success, duration });
  };

  return {
    showError,
    showSuccess,
    showInfo,
    showWarning,
    promiseToast,
  };
};
