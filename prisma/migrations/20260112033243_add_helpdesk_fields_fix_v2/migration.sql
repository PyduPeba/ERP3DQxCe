-- AlterTable
ALTER TABLE "Chamado" ADD COLUMN     "anexos" TEXT,
ADD COLUMN     "categoria" TEXT,
ADD COLUMN     "clienteId" INTEGER,
ADD COLUMN     "equipamento" TEXT,
ADD COLUMN     "numeroSerie" TEXT,
ADD COLUMN     "sla" TIMESTAMP(3),
ADD COLUMN     "tipoAtendimento" TEXT NOT NULL DEFAULT 'remoto';

-- AlterTable
ALTER TABLE "OrdemServico" ADD COLUMN     "assinatura" TEXT,
ADD COLUMN     "dataEncerramento" TIMESTAMP(3),
ADD COLUMN     "dataFim" TIMESTAMP(3),
ADD COLUMN     "dataInicio" TIMESTAMP(3),
ADD COLUMN     "laudoTecnico" TEXT,
ADD COLUMN     "tecnicoResponsavel" TEXT;

-- AddForeignKey
ALTER TABLE "Chamado" ADD CONSTRAINT "Chamado_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
