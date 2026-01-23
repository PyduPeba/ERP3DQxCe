/*
  Warnings:

  - You are about to drop the `Locacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Locacao";

-- CreateTable
CREATE TABLE "Equipamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "marca" TEXT,
    "modelo" TEXT,
    "numeroSerie" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DISPONIVEL',
    "condicao" TEXT,
    "valorAquisicao" DOUBLE PRECISION,
    "dataAquisicao" TIMESTAMP(3),
    "valorLocacaoBase" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContratoLocacao" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "osOrigemId" INTEGER,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "dataDevolucao" TIMESTAMP(3),
    "valorTotalMensal" DOUBLE PRECISION NOT NULL,
    "diaVencimento" INTEGER NOT NULL DEFAULT 5,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "renovacaoAuto" BOOLEAN NOT NULL DEFAULT false,
    "multaAtraso" DOUBLE PRECISION,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContratoLocacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemContrato" (
    "id" SERIAL NOT NULL,
    "contratoId" INTEGER NOT NULL,
    "equipamentoId" INTEGER NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemContrato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipamento_numeroSerie_key" ON "Equipamento"("numeroSerie");

-- CreateIndex
CREATE UNIQUE INDEX "ItemContrato_contratoId_equipamentoId_key" ON "ItemContrato"("contratoId", "equipamentoId");

-- AddForeignKey
ALTER TABLE "ContratoLocacao" ADD CONSTRAINT "ContratoLocacao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemContrato" ADD CONSTRAINT "ItemContrato_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "ContratoLocacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemContrato" ADD CONSTRAINT "ItemContrato_equipamentoId_fkey" FOREIGN KEY ("equipamentoId") REFERENCES "Equipamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
