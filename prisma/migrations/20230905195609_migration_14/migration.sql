/*
  Warnings:

  - You are about to drop the `QuestionCloseAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'EMPLOYEE';

-- DropForeignKey
ALTER TABLE "QuestionCloseAnswer" DROP CONSTRAINT "QuestionCloseAnswer_questionCloseId_fkey";

-- DropTable
DROP TABLE "QuestionCloseAnswer";

-- CreateTable
CREATE TABLE "closeQuestionAnswers" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionCloseId" TEXT NOT NULL,

    CONSTRAINT "closeQuestionAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "closeQuestionAnswers_questionCloseId_key" ON "closeQuestionAnswers"("questionCloseId");

-- AddForeignKey
ALTER TABLE "closeQuestionAnswers" ADD CONSTRAINT "closeQuestionAnswers_questionCloseId_fkey" FOREIGN KEY ("questionCloseId") REFERENCES "closeQuestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
