import { NextFunction, Request, Response } from "express";
import {
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "@/model/company-model";
import { CompanyService } from "./service";
import { toApiResponse } from "@/model/response-model";

export class CompanyController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateCompanyRequest = req.body as CreateCompanyRequest;
      const response = await CompanyService.create(request);

      res.status(201).json(toApiResponse("success", response));
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await CompanyService.get(req.params.id);

      res.status(200).json(toApiResponse("success", company));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(_: Request, res: Response, next: NextFunction) {
    try {
      const companies = await CompanyService.getAll();

      res.status(200).json(toApiResponse("success", companies));
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateCompanyRequest = req.body as UpdateCompanyRequest;
      const response = await CompanyService.update(request);

      res.status(200).json(toApiResponse("success", response));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await CompanyService.delete(req.params.id);

      res.status(200).json(toApiResponse("success", null));
    } catch (error) {
      next(error);
    }
  }
}
