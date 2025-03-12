import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";
import { toApiResponse } from "../model/response-model";
import { AuthService } from "../service/auth-service";
import { ResponseError } from "../error/response-error";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.create(request);

      res.status(201).json(toApiResponse("success", response));
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as CreateUserRequest;
      const response = await AuthService.login(request);

      res.cookie("rtjt", response.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json(
        toApiResponse("success", {
          id: response.id,
          fullName: response.profile?.fullName,
          token: response.token,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.rtjt;
      await AuthService.logout(refreshToken);

      res.clearCookie("rtjt", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.rtjt;

      if (!refreshToken)
        throw new ResponseError(403, "Invalid or expired token");

      const response = await AuthService.refresh(refreshToken);

      res.cookie("rtjt", response.refreshToken, {
        httpOnly: true,
        secure: true,
      });
      res.status(200).json(
        toApiResponse("success", {
          token: response.token,
        })
      );
    } catch (error) {
      next(error);
    }
  }
}
