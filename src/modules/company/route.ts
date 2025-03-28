import express from "express";
import { authMiddleware } from "@/middleware/auth-middleware";
import { CompanyController } from "./controller";

export const companyRouter = express.Router();
// Public Routes
companyRouter.get("/", CompanyController.getAll);

// Secured Routes
companyRouter.use(authMiddleware);
companyRouter.post("/", CompanyController.create);
companyRouter.patch("/", CompanyController.update);
companyRouter.delete("/:id", CompanyController.delete);
companyRouter.get("/detail/:id", CompanyController.get);
