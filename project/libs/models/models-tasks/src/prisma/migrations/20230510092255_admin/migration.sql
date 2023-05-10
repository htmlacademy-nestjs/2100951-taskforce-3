-- CreateTable
CREATE TABLE "updates" (
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "updates_pkey" PRIMARY KEY ("task_id")
);

-- AddForeignKey
ALTER TABLE "updates" ADD CONSTRAINT "updates_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;
