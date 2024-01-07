/*
  Warnings:

  - You are about to drop the column `fileLink` on the `Topic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,sectionId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,subjectId]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "fileLink",
ADD COLUMN     "file" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_sectionId_key" ON "Subject"("name", "sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_subjectId_key" ON "Topic"("name", "subjectId");
