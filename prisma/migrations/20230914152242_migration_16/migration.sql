-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "expLevel" "ExpLevel" NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExamToQuestionOpen" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExamToQuestionClose" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExamToQuestionOpen_AB_unique" ON "_ExamToQuestionOpen"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamToQuestionOpen_B_index" ON "_ExamToQuestionOpen"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExamToQuestionClose_AB_unique" ON "_ExamToQuestionClose"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamToQuestionClose_B_index" ON "_ExamToQuestionClose"("B");

-- AddForeignKey
ALTER TABLE "_ExamToQuestionOpen" ADD CONSTRAINT "_ExamToQuestionOpen_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamToQuestionOpen" ADD CONSTRAINT "_ExamToQuestionOpen_B_fkey" FOREIGN KEY ("B") REFERENCES "openQuestions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamToQuestionClose" ADD CONSTRAINT "_ExamToQuestionClose_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamToQuestionClose" ADD CONSTRAINT "_ExamToQuestionClose_B_fkey" FOREIGN KEY ("B") REFERENCES "closeQuestions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
