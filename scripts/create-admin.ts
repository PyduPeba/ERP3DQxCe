import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const nome = "Super Admin";
    const usuario = "admin";
    const senhaPlana = "admin123"; // VOCÊ PODE MUDAR ISSO
    const hashedPassword = await bcrypt.hash(senhaPlana, 10);

    try {
        const user = await prisma.user.create({
            data: {
                nome,
                usuario,
                senha: hashedPassword,
                perfil: "SUPERADMIN",
                status: true,
            },
        });
        console.log("--------------------------------------");
        console.log("Usuário SUPERADMIN criado com sucesso!");
        console.log(`Usuário: ${usuario}`);
        console.log(`Senha: ${senhaPlana}`);
        console.log("--------------------------------------");
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
