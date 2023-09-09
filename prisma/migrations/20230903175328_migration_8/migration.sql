/*
  Warnings:

  - The values [SSENIOR] on the enum `ExpLevel` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_QuestionCloseToQuestionCloseAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `closeQuestionAnswers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExpLevel_new" AS ENUM ('ENTRY', 'JUNIOR', 'MID', 'SENIOR');
ALTER TABLE "closeQuestions" ALTER COLUMN "expLevel" TYPE "ExpLevel_new" USING ("expLevel"::text::"ExpLevel_new");
ALTER TYPE "ExpLevel" RENAME TO "ExpLevel_old";
ALTER TYPE "ExpLevel_new" RENAME TO "ExpLevel";
DROP TYPE "ExpLevel_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_QuestionCloseToQuestionCloseAnswer" DROP CONSTRAINT "_QuestionCloseToQuestionCloseAnswer_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionCloseToQuestionCloseAnswer" DROP CONSTRAINT "_QuestionCloseToQuestionCloseAnswer_B_fkey";

-- DropTable
DROP TABLE "_QuestionCloseToQuestionCloseAnswer";

-- DropTable
DROP TABLE "closeQuestionAnswers";
