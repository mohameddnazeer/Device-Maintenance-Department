import { toast } from "sonner";
export const handleApiError = (error, duration = 5000) => {
  if (!error.response) {
    toast.error("An unexpected error occurred. Please try again.", { duration });
    return;
  }

  if (error.response.data?.errors) {
    const errorData = error.response.data.errors;

    if (typeof errorData === "object" && !Array.isArray(errorData)) {
      Object.entries(errorData).forEach(([fieldName, messages]) => {
        const formattedFieldName = fieldName
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, str => str.toUpperCase());

        const errorMessages = Array.isArray(messages) ? messages : [messages];

        errorMessages.forEach(message => {
          toast.error(`Error in ${formattedFieldName}: ${message}`, { duration });
        });
      });
    } else if (Array.isArray(errorData)) {
      errorData.forEach(message => {
        toast.error(message, { duration });
      });
    } else {
      toast.error("Validation error occurred. Please check your input.", { duration });
    }
    return;
  }

  if (error.response.data?.message) {
    toast.error(error.response.data.message, { duration });
    return;
  }

  toast.error("An error occurred. Please try again.", { duration });
};

export const toastPromise = (promise, { loading, success, duration = 5000 }) => {
  return toast.promise(promise, {
    loading,
    success: data => {
      if (typeof success === "function") {
        return success(data);
      }
      return success;
    },
    error: err => {
      handleApiError(err, duration);
      return undefined;
    },
  });
};
