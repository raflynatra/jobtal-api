import express from "express";
import { AuthController } from "./controller";

export const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);
authRouter.post("/refresh", AuthController.refresh);
