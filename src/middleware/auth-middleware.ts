import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";
import { UserRequest } from "@/modules/user/types";
import { toApiResponse } from "@/model/response-model";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      res.status(401).json(
        toApiResponse("error", {
          message: "Unauthorized: Invalid or expired token",
        })
      );
    const user = jwt.verify(token!, JWT_SECRET);
    (req as any).user = user;

    next();
  } catch (error) {
    res.status(403).json(
      toApiResponse("error", {
        message: "Unauthorized: Invalid or expired token",
      })
    );
  }
};
