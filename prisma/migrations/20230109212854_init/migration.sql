-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "votedForId" INTEGER NOT NULL,
    "votedAgainstId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Vote_votedForId_idx" ON "Vote"("votedForId");

-- CreateIndex
CREATE INDEX "Vote_votedAgainstId_idx" ON "Vote"("votedAgainstId");
