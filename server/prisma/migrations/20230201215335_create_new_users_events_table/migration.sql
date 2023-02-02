/*
  Warnings:

  - You are about to drop the column `ownerdId` on the `Events` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Events" (
    "eventId" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "joinedId" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    CONSTRAINT "Events_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Events" ("createdAt", "duration", "eventId", "joinedId", "latitude", "longitude") SELECT "createdAt", "duration", "eventId", "joinedId", "latitude", "longitude" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
