import { Profile, User } from "@prisma/client";

export type UserResponse = {
  id: string;
  email: string;
  profile: Omit<Profile, "updatedAt"> | null;
  token?: string;
  refreshToken?: string;
};

export type UserData = User & {
  profile: Profile | null;
};

export type CreateUserRequest = {
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
  return {
    id: user.id,
    email: user.email,
    profile: user.profile,
  };
}
