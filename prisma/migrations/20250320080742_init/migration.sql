/*
  Warnings:

  - You are about to drop the column `userId` on the `companies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_userId_fkey";

-- DropIndex
DROP INDEX "companies_userId_key";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
