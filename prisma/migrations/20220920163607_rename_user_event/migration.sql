/*
  Warnings:

  - You are about to drop the `User_scheduled_events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User_scheduled_events";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "event_time" DATETIME NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
