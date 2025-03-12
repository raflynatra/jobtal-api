/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");
