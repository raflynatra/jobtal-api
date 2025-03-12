export const JWT_SECRET = process.env.JWT_SECRET_KEY ?? "defaultkey";
export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET_KEY ?? "defaultkey";
export const PORT = process.env.API_PORT ?? "3000";
