/*
  Warnings:

  - Added the required column `channel_id` to the `UserEvent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "event_time" DATETIME NOT NULL,
    "channel_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UserEvent" ("createdAt", "event_time", "id", "message", "user_id") SELECT "createdAt", "event_time", "id", "message", "user_id" FROM "UserEvent";
DROP TABLE "UserEvent";
ALTER TABLE "new_UserEvent" RENAME TO "UserEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
