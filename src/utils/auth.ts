import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants";
import { prismaClient } from "../application/database";

type UserTokenParams = {
  id: string;
  fullName?: string;
};

export function generateAccessToken(user: UserTokenParams) {
  return jwt.sign({ id: user.id, name: user.fullName }, JWT_SECRET, {
    expiresIn: "15m",
  });
}

export async function generateRefreshToken(user: UserTokenParams) {
  const refreshToken = jwt.sign(
    { id: user.id, name: user.fullName },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

  await prismaClient.token.create({
    data: {
      userId: user.id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return refreshToken;
}
