import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { CompanyController } from "../controller/company-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

//User API
apiRouter.get("/api/users/current", UserController.get);
apiRouter.post("/api/users/current", UserController.create);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.delete);

//Company API
apiRouter.post("/api/companies", CompanyController.create);
apiRouter.patch("/api/companies", CompanyController.update);
apiRouter.delete("/api/companies/:id", CompanyController.delete);
apiRouter.get("/api/companies/detail/:id", CompanyController.get);
