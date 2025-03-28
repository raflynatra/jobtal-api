import { User } from "@prisma/client";
import { prismaClient } from "@/application/database";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserData,
} from "@/model/user-model";

export class UserRepository {
  static async findUserByEmail<T extends boolean>(
    email: string,
    includeProfile: T
  ): Promise<T extends true ? UserData | null : User | null> {
    const user = await prismaClient.user.findUnique({
      where: { email },
      include: { profile: includeProfile },
    });

    return user as T extends true ? UserData | null : User | null;
  }

  static async findUserById<T extends boolean>(
    id: string,
    includeProfile: T
  ): Promise<T extends true ? UserData | null : User | null> {
    const user = await prismaClient.user.findUnique({
      where: { id },
      include: { profile: includeProfile },
    });

    return user as T extends true ? UserData | null : User | null;
  }

  static async countUserByPhone(phone: string) {
    return await prismaClient.profile.count({
      where: { phone },
    });
  }

  static async createUser(user: CreateUserRequest): Promise<UserData> {
    return await prismaClient.user.create({
      data: {
        email: user.email,
        password: user.password,
        profile: {
          create: { fullName: user.name },
        },
      },
      include: { profile: true },
    });
  }

  static async updateUserProfile(user: UpdateUserRequest) {
    return await prismaClient.profile.update({
      where: {
        userId: user.id,
      },
      data: user,
      include: {
        user: true,
      },
    });
  }

  static async deleteUser(id: string) {
    await prismaClient.user.delete({
      where: { id },
    });
  }
}
