-- CreateTable
CREATE TABLE "Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliente" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
