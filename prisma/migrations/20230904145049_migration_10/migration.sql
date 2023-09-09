-- CreateTable
CREATE TABLE "openQuestions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "expLevel" "ExpLevel" NOT NULL,
    "timeLimit" INTEGER NOT NULL,

    CONSTRAINT "openQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "openQuestions_name_key" ON "openQuestions"("name");
