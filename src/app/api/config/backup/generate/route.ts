import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import AdmZip from "adm-zip";
import path from "path";
import fs from "fs";

export async function GET() {
    try {
        const zip = new AdmZip();

        // Dynamically discover models from the prisma client
        const prismaAny = (prisma as any);
        const allKeys = Object.keys(prismaAny).filter(k => !k.startsWith('_') && !k.startsWith('$'));

        const data: any = {};
        for (const model of allKeys) {
            if (typeof prismaAny[model]?.findMany === 'function') {
                console.log(`Backup: Coletando dados do modelo [${model}]`);
                try {
                    data[model] = await prismaAny[model].findMany();
                } catch (err) {
                    console.error(`Erro ao coletar dados do modelo [${model}]:`, err);
                    data[model] = []; // Continue with empty list if one fails
                }
            }
        }

        const jsonContent = JSON.stringify(data, null, 2);
        zip.addFile("db_dump.json", Buffer.from(jsonContent, "utf8"));

        // 2. Uploads Folder
        const uploadsPath = path.join(process.cwd(), "public", "uploads");
        if (fs.existsSync(uploadsPath)) {
            zip.addLocalFolder(uploadsPath, "uploads");
        }

        const zipBuffer = zip.toBuffer();

        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `backup_erp3d_${timestamp}.zip`;

        return new Response(zipBuffer as any, {
            status: 200,
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error("ERRO GERANDO BACKUP:", error);
        return NextResponse.json({ error: "Erro ao gerar backup" }, { status: 500 });
    }
}
