-- CreateTable
CREATE TABLE "closeQuestionAnswers" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "closeQuestionAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QuestionCloseToQuestionCloseAnswer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionCloseToQuestionCloseAnswer_AB_unique" ON "_QuestionCloseToQuestionCloseAnswer"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionCloseToQuestionCloseAnswer_B_index" ON "_QuestionCloseToQuestionCloseAnswer"("B");

-- AddForeignKey
ALTER TABLE "_QuestionCloseToQuestionCloseAnswer" ADD CONSTRAINT "_QuestionCloseToQuestionCloseAnswer_A_fkey" FOREIGN KEY ("A") REFERENCES "closeQuestions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionCloseToQuestionCloseAnswer" ADD CONSTRAINT "_QuestionCloseToQuestionCloseAnswer_B_fkey" FOREIGN KEY ("B") REFERENCES "closeQuestionAnswers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
