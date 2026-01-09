import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import path from "path";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

const getPrismaClient = () => {
    // Caminho absoluto para o banco de dados SQLite
    const dbPath = path.join(process.cwd(), "prisma", "dev.db");

    // Inicializa o banco SQLite diretamente
    const db = new Database(dbPath);

    // Cria o adapter do Prisma 7 para better-sqlite3
    // @ts-ignore - O tipo está incorreto na biblioteca, mas funciona
    const adapter = new PrismaBetterSqlite3(db);

    // Retorna o PrismaClient com o adapter configurado
    return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
