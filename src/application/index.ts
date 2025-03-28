import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import cookieParser from "cookie-parser";
import { authRouter } from "@/modules/auth/route";
import { userRouter } from "@/modules/user/route";
import { companyRouter } from "@/modules/company/route";

export const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/companies", companyRouter);

app.use(errorMiddleware);
