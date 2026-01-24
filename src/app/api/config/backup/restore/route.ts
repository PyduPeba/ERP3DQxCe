import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const zip = new AdmZip(buffer);
        const zipEntries = zip.getEntries();

        // 1. Extract JSON Data
        const dumpEntry = zipEntries.find((e: any) => e.entryName === "db_dump.json");
        if (!dumpEntry) {
            return NextResponse.json({ error: "Arquivo de backup inválido (db_dump.json ausente)" }, { status: 400 });
        }

        const dumpData = JSON.parse(dumpEntry.getData().toString("utf8"));

        // 2. Extract Uploads
        const uploadsPath = path.join(process.cwd(), "public", "uploads");

        // Clear current uploads
        if (fs.existsSync(uploadsPath)) {
            const files = fs.readdirSync(uploadsPath);
            for (const f of files) {
                const filePath = path.join(uploadsPath, f);
                if (fs.lstatSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                }
            }
        } else {
            fs.mkdirSync(uploadsPath, { recursive: true });
        }

        // Extract new uploads
        zipEntries.forEach((entry: any) => {
            if (entry.entryName.startsWith("uploads/") && !entry.isDirectory) {
                const relativePath = entry.entryName.replace("uploads/", "");
                const targetPath = path.join(uploadsPath, relativePath);
                fs.writeFileSync(targetPath, entry.getData());
            }
        });

        // 3. Database Restore
        // We use a transaction and raw SQL to truncate for speed and to avoid FK issues
        await prisma.$transaction(async (tx) => {
            // Get all table names from the dump keys
            const tables = Object.keys(dumpData);

            // Map table names to actual SQL table names (usually PascalCase in Prisma)
            // Note: Postgres is case-sensitive with quotes. Prisma uses quotes by default.

            // Step A: Disable constraints or truncate CASCADE
            const tableNamesList = tables.map(t => `"${t.charAt(0).toUpperCase() + t.slice(1)}"`).join(", ");
            await tx.$executeRawUnsafe(`TRUNCATE TABLE ${tableNamesList} RESTART IDENTITY CASCADE;`);

            // Step B: Insert Data (We need to be careful with IDs and sequences)
            for (const modelName of tables) {
                const records = dumpData[modelName];
                if (records.length === 0) continue;

                // For each record, we use createMany if possible or a loop
                // Since some records might have complex relationships, we'll do a simple loop for now
                // but createMany is faster.
                for (const record of records) {
                    // Convert date strings back to Date objects
                    const processedRecord = { ...record };
                    for (const key in processedRecord) {
                        if (typeof processedRecord[key] === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(processedRecord[key])) {
                            processedRecord[key] = new Date(processedRecord[key]);
                        }
                    }

                    await (tx as any)[modelName].create({ data: processedRecord });
                }
            }
        });

        return NextResponse.json({ success: true, message: "Backup restaurado com sucesso!" });
    } catch (error) {
        console.error("ERRO RESTAURANDO BACKUP:", error);
        return NextResponse.json({ error: "Erro ao restaurar backup", details: String(error) }, { status: 500 });
    }
}
