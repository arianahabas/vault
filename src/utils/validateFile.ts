import { AppDispatch } from "@/store/store";
import { showToast } from "@/store/documentSlice";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "text/plain", "image/jpeg", "image/png"];

export function validateFile(file: File, dispatch: AppDispatch): boolean {
  if (file.size > MAX_FILE_SIZE) {
    dispatch(showToast({ message: `${file.name} is too large (max 5MB)`, type: "error" }));
    return false;
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    dispatch(showToast({ message: `${file.name} is not a supported file type`, type: "error" }));
    return false;
  }

  return true;
}
