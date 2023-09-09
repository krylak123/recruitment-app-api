/*
  Warnings:

  - You are about to drop the column `answers` on the `closeQuestions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "closeQuestions" DROP COLUMN "answers";

-- CreateTable
CREATE TABLE "QuestionCloseAnswer" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionCloseId" TEXT NOT NULL,

    CONSTRAINT "QuestionCloseAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionCloseAnswer_questionCloseId_key" ON "QuestionCloseAnswer"("questionCloseId");

-- AddForeignKey
ALTER TABLE "QuestionCloseAnswer" ADD CONSTRAINT "QuestionCloseAnswer_questionCloseId_fkey" FOREIGN KEY ("questionCloseId") REFERENCES "closeQuestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
