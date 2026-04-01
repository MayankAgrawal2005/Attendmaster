import toast from "react-hot-toast";

export const showSuccess = (msg) =>
  toast.success(msg, { className: "premium-toast" });

export const showError = (msg) =>
  toast.error(msg, { className: "premium-toast" });