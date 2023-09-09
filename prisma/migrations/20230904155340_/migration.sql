/*
  Warnings:

  - You are about to drop the column `answers` on the `closeQuestions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[questionCloseId]` on the table `QuestionCloseAnswer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionCloseId` to the `QuestionCloseAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionCloseAnswer" ADD COLUMN     "questionCloseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "closeQuestions" DROP COLUMN "answers";

-- CreateIndex
CREATE UNIQUE INDEX "QuestionCloseAnswer_questionCloseId_key" ON "QuestionCloseAnswer"("questionCloseId");

-- AddForeignKey
ALTER TABLE "QuestionCloseAnswer" ADD CONSTRAINT "QuestionCloseAnswer_questionCloseId_fkey" FOREIGN KEY ("questionCloseId") REFERENCES "closeQuestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
