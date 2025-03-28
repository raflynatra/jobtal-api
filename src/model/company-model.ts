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

export function toCompanyResponse<T extends CompanyData | CompanyData[]>(
  company: T
): T extends CompanyData[] ? CompanyResponse[] : CompanyResponse {
  const transform = (c: CompanyData): CompanyResponse => ({
    id: c.id,
    name: c.name,
    logoUrl: c.logoUrl,
    location: c.location,
    industry: c.industry,
    websiteUrl: c.websiteUrl,
    totalJobCount: c.jobs?.length,
  });

  return (
    Array.isArray(company) ? company.map(transform) : transform(company)
  ) as T extends CompanyData[] ? CompanyResponse[] : CompanyResponse;
}
