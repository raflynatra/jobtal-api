import express from "express";
import { UserController } from "./controller";
import { authMiddleware } from "@/middleware/auth-middleware";

export const userRouter = express.Router();

userRouter.use(authMiddleware);
userRouter.get("/current", UserController.get);
userRouter.post("/current", UserController.create);
userRouter.patch("/current", UserController.update);
userRouter.delete("/current", UserController.delete);
