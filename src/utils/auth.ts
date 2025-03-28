import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants";
import { AuthRepository } from "../modules/auth/repository";

type UserTokenParams = {
  id: string;
  fullName?: string;
};

export function generateAccessToken(user: UserTokenParams) {
  return jwt.sign({ id: user.id, name: user.fullName }, JWT_SECRET, {
    expiresIn: "15m",
  });
}

export async function generateRefreshToken(user: UserTokenParams) {
  const refreshToken = jwt.sign(
    { id: user.id, name: user.fullName },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );

  await AuthRepository.insertToken(refreshToken, user.id);

  return refreshToken;
}

export function generatePassword(length = 8) {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";

  // Ensure at least one uppercase, one symbol
  const requiredChars = [
    uppercase[Math.floor(Math.random() * uppercase.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  // Generate the rest of the password
  const allChars = uppercase + lowercase + numbers + symbols;
  while (requiredChars.length < length) {
    requiredChars.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle and return as a string
  return [...requiredChars].sort(() => Math.random() - 0.5).join("");
}
