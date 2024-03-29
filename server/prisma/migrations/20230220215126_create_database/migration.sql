-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profession" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Events" (
    "eventId" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "joinedId" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    CONSTRAINT "Events_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
