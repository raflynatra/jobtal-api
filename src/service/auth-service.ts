import {
  LoginUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/auth";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET } from "../constants";
import { JWTPayload } from "../type";

export class AuthService {
  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    const user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
      include: {
        profile: true,
      },
    });

    if (!user) throw new ResponseError(401, "Email or password is invalid");

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid)
      throw new ResponseError(401, "Email or password is invalid");

    const token = generateAccessToken({
      id: user.id,
      fullName: user.profile?.fullName,
    });
    const refreshToken = await generateRefreshToken({
      id: user.id,
      fullName: user.profile?.fullName,
    });

    await prismaClient.token.deleteMany({ where: { userId: user.id } });

    const response = toUserResponse(user);
    response.token = token;
    response.refreshToken = refreshToken;

    return response;
  }

  static async logout(refreshToken: string) {
    await prismaClient.token.deleteMany({
      where: { refreshToken: refreshToken },
    });
  }

  static async refresh(refreshToken: string) {
    const storedToken = await prismaClient.token.findUnique({
      where: { refreshToken },
    });
    if (!storedToken)
      throw new ResponseError(403, "Invalid token or session expired");

    try {
      const user = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JWTPayload;
      await prismaClient.token.delete({ where: { refreshToken } });

      const newRefreshToken = await generateRefreshToken(user);
      const newToken = generateAccessToken(user);

      return {
        token: newToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new ResponseError(401, "Invalid token or session expired");
    }
  }
}
