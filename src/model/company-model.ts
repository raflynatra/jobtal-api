import { Company, Job } from "@prisma/client";

export type CompanyResponse = {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  industry: string;
  location: string;
  totalJobCount?: number;
};

export type CompanyData = Company & {
  jobs?: Job[] | null;
};

export type CreateCompanyRequest = {
  name: string;
  location: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  industry: string;
};

export type UpdateCompanyRequest = {
  id: string;
} & Partial<CreateCompanyRequest>;

export function toCompanyResponse(
  company: CompanyData | CompanyData[]
): CompanyResponse | CompanyResponse[] {
  if (Array.isArray(company)) {
    return company.map((c) => ({
      id: c.id,
      name: c.name,
      logoUrl: c.logoUrl,
      location: c.location,
      industry: c.industry,
      websiteUrl: c.websiteUrl,
      totalJobCount: c.jobs?.length,
    }));
  }

  return {
    id: company.id,
    name: company.name,
    logoUrl: company.logoUrl,
    location: company.location,
    industry: company.industry,
    websiteUrl: company.websiteUrl,
    totalJobCount: company?.jobs?.length,
  };
}
