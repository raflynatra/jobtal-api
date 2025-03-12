import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

//User API
apiRouter.get("/api/users/current", UserController.get);
apiRouter.post("/api/users/current", UserController.create);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.delete);

//Jobs API
// apiRouter.post("/api/jobs", JobController.create);
