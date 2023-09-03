/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ExpLevel" AS ENUM ('ENTRY', 'JUNIOR', 'MID', 'SSENIOR');

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "closeQuestionAnswers" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "closeQuestionAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "closeQuestions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "expLevel" "ExpLevel" NOT NULL,
    "timeLimit" INTEGER NOT NULL,

    CONSTRAINT "closeQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuestionCloseToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionCloseToQuestionCloseAnswer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "closeQuestions_name_key" ON "closeQuestions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionCloseToTag_AB_unique" ON "_QuestionCloseToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionCloseToTag_B_index" ON "_QuestionCloseToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionCloseToQuestionCloseAnswer_AB_unique" ON "_QuestionCloseToQuestionCloseAnswer"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionCloseToQuestionCloseAnswer_B_index" ON "_QuestionCloseToQuestionCloseAnswer"("B");

-- AddForeignKey
ALTER TABLE "_QuestionCloseToTag" ADD CONSTRAINT "_QuestionCloseToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "closeQuestions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionCloseToTag" ADD CONSTRAINT "_QuestionCloseToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionCloseToQuestionCloseAnswer" ADD CONSTRAINT "_QuestionCloseToQuestionCloseAnswer_A_fkey" FOREIGN KEY ("A") REFERENCES "closeQuestions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionCloseToQuestionCloseAnswer" ADD CONSTRAINT "_QuestionCloseToQuestionCloseAnswer_B_fkey" FOREIGN KEY ("B") REFERENCES "closeQuestionAnswers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
