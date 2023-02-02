-- CreateTable
CREATE TABLE "Users" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Events" (
    "eventId" TEXT NOT NULL PRIMARY KEY,
    "ownerdId" TEXT NOT NULL,
    "joinedId" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    CONSTRAINT "Events_ownerdId_fkey" FOREIGN KEY ("ownerdId") REFERENCES "Users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
