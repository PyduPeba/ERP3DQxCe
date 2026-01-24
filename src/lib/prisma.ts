import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as {
    prisma_v23: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;

console.log("Variável de Ambiente DATABASE_URL:", connectionString ? "Configurada" : "AUSENTE");
if (!connectionString) {
    console.error("ERRO CRÍTICO: DATABASE_URL não está definida!");
    throw new Error("DATABASE_URL não está configurada no arquivo .env");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma_v23 ?? new PrismaClient({
    adapter,
    log: ["query", "error", "warn"],
});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma_v23 = prisma;
}
