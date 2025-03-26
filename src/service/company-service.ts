import {
  CompanyResponse,
  CreateCompanyRequest,
  toCompanyResponse,
  UpdateCompanyRequest,
} from "../model/company-model";
import { Validation } from "../validation/validation";
import { CompanyValidation } from "../validation/company-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

export class CompanyService {
  static async create(request: CreateCompanyRequest): Promise<CompanyResponse> {
    const createRequest = Validation.validate(
      CompanyValidation.CREATE,
      request
    );

    const totalCompany = await prismaClient.company.count({
      where: { name: createRequest.name },
    });

    if (totalCompany !== 0) {
      throw new ResponseError(400, "Company already exists");
    }

    const company = await prismaClient.company.create({
      data: {
        name: createRequest.name,
        logoUrl: createRequest.logoUrl,
        websiteUrl: createRequest.websiteUrl,
        industry: createRequest.industry,
        location: createRequest.location,
      },
    });

    return toCompanyResponse(company) as CompanyResponse;
  }

  static async get(companyId: string): Promise<CompanyResponse> {
    if (!companyId) {
      throw new ResponseError(400, "Company ID is required");
    }

    const result = await prismaClient.company.findUnique({
      where: { id: companyId },
      include: { jobs: true },
    });

    return toCompanyResponse(result!) as CompanyResponse;
  }

  static async getAll(): Promise<CompanyResponse[]> {
    const result = await prismaClient.company.findMany({
      include: { jobs: true },
    });

    return toCompanyResponse(result) as CompanyResponse[];
  }

  static async update(request: UpdateCompanyRequest): Promise<CompanyResponse> {
    const updateRequest = Validation.validate(
      CompanyValidation.UPDATE,
      request
    );

    const result = await prismaClient.company.update({
      where: { id: request.id },
      data: updateRequest,
    });

    return toCompanyResponse(result) as CompanyResponse;
  }

  static async delete(companyId: string) {
    await prismaClient.company.delete({
      where: { id: companyId },
    });
  }
}
