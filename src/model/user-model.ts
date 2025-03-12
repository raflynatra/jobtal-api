import { Profile, User } from "@prisma/client";

export type UserResponse = {
  id: string;
  email: string;
  profile: Omit<Profile, "updatedAt"> | null;
  token?: string;
  refreshToken?: string;
};

export type UserParams = User & {
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
  name?: string;
  avatarUrl?: string;
  phone?: string;
};

export function toUserResponse(user: UserParams): UserResponse {
  return {
    id: user.id,
    email: user.email,
    profile: user.profile,
  };
}
