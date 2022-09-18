-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "target_channel" TEXT
);
INSERT INTO "new_Guild" ("createdAt", "id", "name", "target_channel") SELECT "createdAt", "id", "name", "target_channel" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
