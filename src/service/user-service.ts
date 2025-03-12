import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {
  static async create(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserWithSameUsername !== 0) {
      throw new ResponseError(400, "Email already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: {
        email: registerRequest.email,
        password: registerRequest.password,
        profile: {
          create: {
            fullName: registerRequest.name,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return toUserResponse(user);
  }

  static async get(user: User): Promise<UserResponse> {
    const result = await prismaClient.user.findFirst({
      where: {
        email: user?.email,
      },
      include: {
        profile: true,
      },
    });

    return toUserResponse(result!);
  }

  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    const totalUserWithSamePhone = await prismaClient.profile.count({
      where: {
        phone: updateRequest.phone,
      },
    });

    if (totalUserWithSamePhone !== 0) {
      throw new ResponseError(400, "Phone is already registered");
    }

    const { user: userResult, ...profile } = await prismaClient.profile.update({
      where: {
        userId: user.id,
      },
      data: updateRequest,
      include: {
        user: true,
      },
    });

    return toUserResponse({ ...user, profile });
  }

  static async delete(user: User) {
    await prismaClient.user.delete({
      where: {
        email: user.email,
      },
    });
  }
}
