/*
  Warnings:

  - Added the required column `industry` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "industry" TEXT NOT NULL,
ADD COLUMN     "websiteUrl" TEXT;
