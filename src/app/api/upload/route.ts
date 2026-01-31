import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const extension = path.extname(file.name) || ".jpg";
        const filename = `${crypto.randomUUID()}${extension}`;
        const uploadDir = path.join(process.cwd(), "public/uploads");

        console.log("Saving file:", filename, "to", uploadDir);

        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) { }

        await writeFile(path.join(uploadDir, filename), buffer);

        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
