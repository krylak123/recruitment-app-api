/*
  Warnings:

  - You are about to drop the column `questionCloseId` on the `QuestionCloseAnswer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionCloseAnswer" DROP CONSTRAINT "QuestionCloseAnswer_questionCloseId_fkey";

-- DropIndex
DROP INDEX "QuestionCloseAnswer_questionCloseId_key";

-- AlterTable
ALTER TABLE "QuestionCloseAnswer" DROP COLUMN "questionCloseId";

-- AlterTable
ALTER TABLE "closeQuestions" ADD COLUMN     "answers" JSONB[];
