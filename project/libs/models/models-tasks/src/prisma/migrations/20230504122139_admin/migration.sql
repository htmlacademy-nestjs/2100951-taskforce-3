/*
  Warnings:

  - The `status` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Executor', 'Customer');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('New', 'Canceled', 'InWork', 'Done', 'Failed');

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "city" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'New';

-- DropEnum
DROP TYPE "StatusTask";
