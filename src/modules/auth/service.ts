import {
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UserData,
  UserResponse,
} from "@/model/user-model";
import { Validation } from "@/validation";
import { ResponseError } from "@/error/response-error";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth";
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET } from "@/constants";
import { JWTPayload } from "@/modules/auth/type";
import { AuthRepository } from "./repository";
import { AuthValidation } from "./validation";
import { UserService } from "../user/service";

export class AuthService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    return UserService.create(request);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(AuthValidation.LOGIN, request);

    const user = (await UserService.getUserByEmail(
      loginRequest.email,
      true
    )) as UserData;

    if (!user) throw new ResponseError(401, "Email or password is invalid");

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordValid)
      throw new ResponseError(401, "Email or password is invalid");

    await AuthRepository.deleteTokenByUserId(user.id);

    const token = generateAccessToken({
      id: user.id,
      fullName: user.profile?.fullName,
    });
    const refreshToken = await generateRefreshToken({
      id: user.id,
      fullName: user.profile?.fullName,
    });

    const response = toUserResponse(user);
    response.token = token;
    response.refreshToken = refreshToken;

    return response;
  }

  static async logout(refreshToken: string) {
    await AuthRepository.deleteTokenByRefreshToken(refreshToken);
  }

  static async refresh(refreshToken: string) {
    const storedToken = await AuthRepository.getTokenByRefreshToken(
      refreshToken
    );

    if (!storedToken)
      throw new ResponseError(403, "Invalid token or session expired");

    try {
      const user = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JWTPayload;
      await AuthRepository.deleteTokenByRefreshToken(refreshToken);

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
