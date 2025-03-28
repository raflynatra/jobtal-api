import { removeProperties } from "@/utils/object";
import { Prisma, Profile } from "@prisma/client";

export type UserResponse = {
  id: string;
  email: string;
  profile?: Omit<Profile, "updatedAt" | "userId"> | null;
  token?: string;
  refreshToken?: string;
};

export type UserData = Prisma.UserGetPayload<{ include: { profile: true } }>;

export type CreateUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type RegisterUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  phone?: string;
};

export function toUserResponse(user: UserData): UserResponse {
  if (!user.profile)
    return {
      id: user.id,
      email: user.email,
    };

  const profile = removeProperties(user.profile, ["userId", "updatedAt"]);

  return {
    id: user.id,
    email: user.email,
    profile: profile,
  };
}
