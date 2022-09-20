-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "event_time" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UserEvent" ("channel_id", "createdAt", "event_time", "id", "message", "user_id") SELECT "channel_id", "createdAt", "event_time", "id", "message", "user_id" FROM "UserEvent";
DROP TABLE "UserEvent";
ALTER TABLE "new_UserEvent" RENAME TO "UserEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
