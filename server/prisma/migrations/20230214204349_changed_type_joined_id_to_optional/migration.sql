-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Events" (
    "eventId" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "joinedId" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    CONSTRAINT "Events_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Events" ("createdAt", "eventId", "hourEnd", "hourStart", "joinedId", "latitude", "longitude", "ownerId") SELECT "createdAt", "eventId", "hourEnd", "hourStart", "joinedId", "latitude", "longitude", "ownerId" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;