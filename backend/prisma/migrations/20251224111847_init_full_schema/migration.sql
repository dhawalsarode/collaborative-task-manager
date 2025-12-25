/*
  Warnings:

  - You are about to drop the `TaskAuditLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskAuditLog" DROP CONSTRAINT "TaskAuditLog_taskId_fkey";

-- DropTable
DROP TABLE "TaskAuditLog";
