import { prismaClient } from "@/application/database";

export class AuthRepository {
  static async getTokenByRefreshToken(refreshToken: string) {
    return await prismaClient.token.findUnique({
      where: { refreshToken },
    });
  }

  static async insertToken(refreshToken: string, userId: string) {
    return await prismaClient.token.create({
      data: {
        userId,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  static async deleteTokenByUserId(userId: string) {
    return await prismaClient.token.deleteMany({
      where: { userId },
    });
  }

  static async deleteTokenByRefreshToken(refreshToken: string) {
    return await prismaClient.token.deleteMany({
      where: { refreshToken },
    });
  }
}
