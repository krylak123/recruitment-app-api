/*
  Warnings:

  - You are about to drop the column `test` on the `exams` table. All the data in the column will be lost.
  - Added the required column `timeLimitSummary` to the `exams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exams" DROP COLUMN "test",
ADD COLUMN     "timeLimitSummary" INTEGER NOT NULL,
ALTER COLUMN "questionQuantity" DROP DEFAULT;
