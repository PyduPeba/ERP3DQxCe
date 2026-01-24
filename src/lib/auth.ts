import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "segredo-super-secreto-mudeme";
const key = new TextEncoder().encode(secretKey);

export async function signSession(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("8h") // 8 horas de sessão
        .sign(key);
}

export interface SessionPayload {
    sub: string;
    nome: string;
    perfil: string;
    [key: string]: any;
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ["HS256"],
        });
        return payload as unknown as SessionPayload;
    } catch (error) {
        return null;
    }
}
