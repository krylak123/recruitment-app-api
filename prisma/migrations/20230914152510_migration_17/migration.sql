/*
  Warnings:

  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExamToQuestionClose" DROP CONSTRAINT "_ExamToQuestionClose_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExamToQuestionOpen" DROP CONSTRAINT "_ExamToQuestionOpen_A_fkey";

-- DropTable
DROP TABLE "Exam";

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expLevel" "ExpLevel" NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "_ExamToQuestionOpen" ADD CONSTRAINT "_ExamToQuestionOpen_A_fkey" FOREIGN KEY ("A") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamToQuestionClose" ADD CONSTRAINT "_ExamToQuestionClose_A_fkey" FOREIGN KEY ("A") REFERENCES "exams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
