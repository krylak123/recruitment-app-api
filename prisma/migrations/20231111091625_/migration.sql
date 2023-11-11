-- CreateTable
CREATE TABLE "UserAdditionalInfo" (
    "id" TEXT NOT NULL,
    "gitRepoLink" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAdditionalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdditionalInfo_userId_key" ON "UserAdditionalInfo"("userId");

-- AddForeignKey
ALTER TABLE "UserAdditionalInfo" ADD CONSTRAINT "UserAdditionalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
