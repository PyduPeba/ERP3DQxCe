/*
  Warnings:

  - You are about to drop the column `fornecedor` on the `ItemEstoque` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigoBarras]` on the table `ItemEstoque` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ItemEstoque" DROP COLUMN "fornecedor",
ADD COLUMN     "codigoBarras" TEXT,
ADD COLUMN     "custoMedio" DOUBLE PRECISION,
ADD COLUMN     "fornecedorPrincipal" TEXT,
ADD COLUMN     "unidade" TEXT NOT NULL DEFAULT 'un';

-- CreateTable
CREATE TABLE "MovimentacaoEstoque" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "origem" TEXT NOT NULL,
    "docReferencia" TEXT,
    "observacoes" TEXT,
    "userId" INTEGER,
    "usuario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovimentacaoEstoque_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemEstoque_codigoBarras_key" ON "ItemEstoque"("codigoBarras");

-- AddForeignKey
ALTER TABLE "MovimentacaoEstoque" ADD CONSTRAINT "MovimentacaoEstoque_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ItemEstoque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
