import {
  CompanyResponse,
  CreateCompanyRequest,
  toCompanyResponse,
  UpdateCompanyRequest,
} from "@/model/company-model";
import { Validation } from "@/validation";
import { CompanyValidation } from "./validation";
import { ResponseError } from "@/error/response-error";
import { CompanyRepository } from "./repository";

export class CompanyService {
  static async create(request: CreateCompanyRequest): Promise<CompanyResponse> {
    const createRequest = Validation.validate(
      CompanyValidation.CREATE,
      request
    );

    const totalCompany = await CompanyRepository.countCompanyByName(
      createRequest.name
    );
    if (totalCompany !== 0) {
      throw new ResponseError(400, "Company is already registered");
    }

    const company = await CompanyRepository.createCompany(createRequest);

    return toCompanyResponse(company);
  }

  static async get(companyId: string): Promise<CompanyResponse> {
    if (!companyId) {
      throw new ResponseError(400, "Company ID is required");
    }

    const result = await CompanyRepository.findCompanyById(companyId);

    if (!result) throw new ResponseError(404, "Company does not exist");

    return toCompanyResponse(result);
  }

  static async getAll(): Promise<CompanyResponse[]> {
    const result = await CompanyRepository.getAllCompanies();

    return toCompanyResponse(result);
  }

  static async update(request: UpdateCompanyRequest): Promise<CompanyResponse> {
    const updateRequest = Validation.validate(
      CompanyValidation.UPDATE,
      request
    );

    const result = await CompanyRepository.updateCompany(updateRequest);

    return toCompanyResponse(result);
  }

  static async delete(companyId: string) {
    await CompanyRepository.deleteCompany(companyId);
  }
}
