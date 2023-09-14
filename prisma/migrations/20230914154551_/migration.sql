/*
  Warnings:

  - You are about to drop the column `test` on the `exams` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `exams` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "exams" DROP COLUMN "test";

-- CreateIndex
CREATE UNIQUE INDEX "exams_name_key" ON "exams"("name");
