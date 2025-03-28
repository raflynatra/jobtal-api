import { User } from "@prisma/client";
import { ResponseError } from "@/error/response-error";
import {
  CreateUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserData,
  UserResponse,
} from "@/model/user-model";
import { UserValidation } from "./validation";
import { Validation } from "@/validation";
import bcrypt from "bcrypt";
import { UserRepository } from "./repository";
import { generatePassword } from "@/utils/auth";

export class UserService {
  static async create(request: CreateUserRequest): Promise<UserResponse> {
    const userRequest = Validation.validate(UserValidation.CREATE, request);

    const existingUser = await UserRepository.findUserByEmail(
      userRequest.email,
      false
    );
    if (existingUser)
      throw new ResponseError(400, "Email is already registered");

    userRequest.password = await bcrypt.hash(
      userRequest.password ?? generatePassword(),
      10
    );

    const user = await UserRepository.createUser(userRequest);

    return toUserResponse(user);
  }

  static async getUserById(userId?: string): Promise<UserResponse> {
    if (!userId) throw new ResponseError(400, "User ID is required");

    const user = await UserRepository.findUserById(userId, true);

    if (!user) throw new ResponseError(404, "User does not exist");

    return toUserResponse(user);
  }

  static async getUserByEmail(
    email: string,
    includeProfile = false
  ): Promise<User | UserData> {
    const user = await UserRepository.findUserByEmail(email, includeProfile);

    if (!user) throw new ResponseError(404, "User does not exist");

    return user;
  }

  static async update(request: UpdateUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    if (updateRequest.phone) {
      const totalUserWithSamePhone = await UserRepository.countUserByPhone(
        updateRequest.phone
      );

      if (totalUserWithSamePhone !== 0) {
        throw new ResponseError(400, "Phone is already registered");
      }
    }

    const { user, ...profile } = await UserRepository.updateUserProfile(
      updateRequest
    );

    return toUserResponse({ ...user, profile });
  }

  static async delete(userId?: string) {
    if (!userId) throw new ResponseError(400, "User ID is required");

    await UserRepository.deleteUser(userId);
  }
}
