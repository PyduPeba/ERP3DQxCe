-- CreateTable
CREATE TABLE "Chamado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL DEFAULT 'media',
    "status" TEXT NOT NULL DEFAULT 'aberto',
    "cliente" TEXT,
    "tecnico" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OrdemServico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" TEXT NOT NULL,
    "chamadoId" INTEGER,
    "cliente" TEXT,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "valorMaoObra" REAL,
    "observacoes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OrdemServico_chamadoId_fkey" FOREIGN KEY ("chamadoId") REFERENCES "Chamado" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemOS" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "osId" INTEGER NOT NULL,
    "itemEstoqueId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valorUnitario" REAL,
    CONSTRAINT "ItemOS_osId_fkey" FOREIGN KEY ("osId") REFERENCES "OrdemServico" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ItemOS_itemEstoqueId_fkey" FOREIGN KEY ("itemEstoqueId") REFERENCES "ItemEstoque" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemEstoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "categoria" TEXT,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "minimo" INTEGER NOT NULL DEFAULT 0,
    "valorUnit" REAL,
    "fornecedor" TEXT,
    "localizacao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Locacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "equipamento" TEXT NOT NULL,
    "descricao" TEXT,
    "cliente" TEXT,
    "dataInicio" DATETIME NOT NULL,
    "dataFim" DATETIME NOT NULL,
    "valorMensal" REAL NOT NULL,
    "valorTotal" REAL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "observacoes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OrdemServico_numero_key" ON "OrdemServico"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "ItemEstoque_codigo_key" ON "ItemEstoque"("codigo");
