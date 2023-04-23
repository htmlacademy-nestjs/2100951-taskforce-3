/*
  Warnings:

  - The primary key for the `tasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `categoty_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `responses` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `responses_total` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusTask" AS ENUM ('New', 'Cancelled', 'InProgress', 'Done', 'Failed');

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_task_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_categoty_id_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_pkey",
DROP COLUMN "_id",
DROP COLUMN "categoty_id",
DROP COLUMN "responses",
DROP COLUMN "responses_total",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "task_id" SERIAL NOT NULL,
ALTER COLUMN "price" DROP DEFAULT,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusTask" NOT NULL,
ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id");

-- DropTable
DROP TABLE "categories";

-- DropEnum
DROP TYPE "TaskStatus";

-- CreateTable
CREATE TABLE "category" (
    "category_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "responses" (
    "response_id" SERIAL NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "user_id" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("response_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "responses_task_id_key" ON "responses"("task_id");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
