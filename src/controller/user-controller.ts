import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, UpdateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";
import { toApiResponse } from "../model/response-model";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.create(request);

      res.status(201).json(toApiResponse("success", response));
    } catch (error) {
      next(error);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.get(req.user!);

      res.status(200).json(toApiResponse("success", response));
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(req.user!, request);

      res.status(200).json(toApiResponse("success", response));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await UserService.delete(req.user!);

      res.status(200).json(toApiResponse("success", null));
    } catch (error) {
      next(error);
    }
  }
}
