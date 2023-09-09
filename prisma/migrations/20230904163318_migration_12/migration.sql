/*
  Warnings:

  - You are about to drop the `QuestionCloseAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionCloseAnswer" DROP CONSTRAINT "QuestionCloseAnswer_questionCloseId_fkey";

-- AlterTable
ALTER TABLE "closeQuestions" ADD COLUMN     "answers" TEXT[];

-- DropTable
DROP TABLE "QuestionCloseAnswer";
