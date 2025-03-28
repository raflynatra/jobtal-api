import { prismaClient } from "@/application/database";
import {
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "@/model/company-model";

export class CompanyRepository {
  static async getAllCompanies() {
    return await prismaClient.company.findMany({
      include: { jobs: true },
    });
  }

  static async findCompanyById(id: string) {
    return await prismaClient.company.findUnique({
      where: { id },
      include: { jobs: true },
    });
  }

  static async countCompanyByName(name: string) {
    return await prismaClient.company.count({
      where: { name },
    });
  }

  static async createCompany(company: CreateCompanyRequest) {
    return await prismaClient.company.create({
      data: company,
    });
  }

  static async updateCompany(company: UpdateCompanyRequest) {
    return await prismaClient.company.update({
      where: { id: company.id },
      data: company,
    });
  }

  static async deleteCompany(id: string) {
    return await prismaClient.company.delete({
      where: { id },
    });
  }
}
