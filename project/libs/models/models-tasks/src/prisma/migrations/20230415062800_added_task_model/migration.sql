-- CreateEnum
CREATE TYPE "City" AS ENUM ('Moscow', 'SaintPetersburg', 'Vladivostok');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('New', 'Canceled', 'InWork', 'Completed', 'Failed');

-- AlterTable
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_pkey",
DROP COLUMN "category_id",
DROP COLUMN "myTaskId",
DROP COLUMN "response_id",
DROP COLUMN "task_id",
ADD COLUMN     "_id" SERIAL NOT NULL,
ADD COLUMN     "categoty_id" INTEGER NOT NULL,
ADD COLUMN     "responses" TEXT[],
ADD COLUMN     "responses_total" INTEGER DEFAULT 0,
ADD COLUMN     "status" "TaskStatus" NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
DROP COLUMN "city",
ADD COLUMN     "city" "City" NOT NULL,
ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("_id");

-- CreateTable
CREATE TABLE "categories" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" SERIAL NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "user_id" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_title_key" ON "categories"("title");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_categoty_id_fkey" FOREIGN KEY ("categoty_id") REFERENCES "categories"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
