export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: T;
  message?: string;
};

export function toApiResponse<T>(
  type: "success" | "error",
  response: T
): ApiResponse<T> {
  return {
    data: type === "success" ? response : undefined,
    error: type === "error" ? response : undefined,
    success: type === "success",
  };
}
