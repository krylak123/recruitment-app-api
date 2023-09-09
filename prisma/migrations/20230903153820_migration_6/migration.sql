/*
  Warnings:

  - You are about to drop the `_QuestionCloseToQuestionCloseAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionCloseToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `closeQuestionAnswers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuestionCloseToQuestionCloseAnswer" DROP CONSTRAINT "_QuestionCloseToQuestionCloseAnswer_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionCloseToQuestionCloseAnswer" DROP CONSTRAINT "_QuestionCloseToQuestionCloseAnswer_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionCloseToTag" DROP CONSTRAINT "_QuestionCloseToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionCloseToTag" DROP CONSTRAINT "_QuestionCloseToTag_B_fkey";

-- DropTable
DROP TABLE "_QuestionCloseToQuestionCloseAnswer";

-- DropTable
DROP TABLE "_QuestionCloseToTag";

-- DropTable
DROP TABLE "closeQuestionAnswers";

-- DropTable
DROP TABLE "tags";
