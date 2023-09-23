/*
  Warnings:

  - You are about to drop the column `questionCloseQuantity` on the `exams` table. All the data in the column will be lost.
  - You are about to drop the column `questionOpenQuantity` on the `exams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exams" DROP COLUMN "questionCloseQuantity",
DROP COLUMN "questionOpenQuantity",
ADD COLUMN     "questionQuantity" INTEGER NOT NULL DEFAULT 0;
