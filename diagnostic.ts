import { prisma } from "./src/lib/prisma";

async function main() {
    try {
        console.log("Testing ItemEstoque model in current client...");

        // Test CREATE
        console.log("Testing CREATE...");
        const newItem = await prisma.itemEstoque.create({
            data: {
                nome: "Test Product Diag",
                codigo: "SKU-DIAG-" + Date.now(),
                codigoBarras: "EAN-" + Date.now(),
                marca: "DiagBrand",
                modelo: "DiagModel",
                rastreavel: true,
                fotos: ["http://example.com/test.jpg"],
                quantidade: 1,
                minimo: 0,
                valorVenda: 100
            }
        });
        console.log("CREATE Success:", newItem.id);

        // Test UPDATE
        console.log("Testing UPDATE...");
        const updatedItem = await prisma.itemEstoque.update({
            where: { id: newItem.id },
            data: {
                nome: "Test Product Diag Updated",
                rastreavel: false
            }
        });
        console.log("UPDATE Success:", updatedItem.nome);

        // Cleanup
        console.log("Cleaning up...");
        await prisma.itemEstoque.delete({ where: { id: newItem.id } });
        console.log("Cleanup Success.");

    } catch (e: any) {
        console.error("DIAGNOSTIC FAILED:", e.message);
        if (e.code) console.error("Prisma Code:", e.code);
        if (e.meta) console.error("Prisma Meta:", e.meta);
    } finally {
        process.exit(0);
    }
}

main();
