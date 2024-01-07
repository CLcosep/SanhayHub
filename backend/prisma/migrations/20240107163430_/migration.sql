/*
  Warnings:

  - A unique constraint covering the columns `[name,gradeId]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Section_gradeId_key";

-- DropIndex
DROP INDEX "Section_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_gradeId_key" ON "Section"("name", "gradeId");
