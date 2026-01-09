import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

const execAsync = promisify(exec);

// Path to OpenSCAD executable
const OPENSCAD_PATH = '"C:\\Program Files\\OpenSCAD\\openscad.exe"';

// Simple Concurrency Controller
class Semaphore {
    private tasks: (() => void)[] = [];
    private activeCount = 0;
    constructor(private maxConcurrency: number) { }

    async acquire() {
        if (this.activeCount < this.maxConcurrency) {
            this.activeCount++;
            return;
        }
        return new Promise<void>(resolve => {
            this.tasks.push(resolve);
        });
    }

    release() {
        this.activeCount--;
        if (this.tasks.length > 0) {
            this.activeCount++;
            const next = this.tasks.shift();
            if (next) next();
        }
    }
}

const generatorSemaphore = new Semaphore(2); // Limita a 2 gerações simultâneas para não travar o CPU
const CACHE_DIR = path.join(process.cwd(), 'stl-cache');

if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
}

export async function POST(req: NextRequest) {
    try {
        const params = await req.json();

        // 1. MD5 Caching Logic
        const paramString = JSON.stringify(params);
        const hash = crypto.createHash('md5').update(paramString).digest('hex');
        const cachedPath = path.join(CACHE_DIR, `${hash}.stl`);

        // Verificamos se já existe no cache
        if (existsSync(cachedPath)) {
            console.log(`[Cache Hit] Returning cached STL for hash: ${hash}`);
            const cachedBuffer = await fs.readFile(cachedPath);
            return new NextResponse(cachedBuffer, {
                headers: {
                    'Content-Type': 'model/stl',
                    'Content-Disposition': `attachment; filename="letra_caixa_cached.stl"`,
                    'X-Cache': 'HIT'
                },
            });
        }

        const {
            palavra = "3D",
            tamanhoFonte = 50,
            espessuraLetra = 10,
            espessuraTampa = 1,
            espessuraBase = 2,
            larguraBorda = 1,
            larguraDegrau = 0.8,
            tolerancia = 0.2,
            parteExibir = "Completo",
            espacoChars = 0.8
        } = params;

        const escapedPalavra = palavra.replace(/"/g, '\\"');

        const scadContent = `
$fn = 35; // Balanced preview resolution

module word_outline(txt, delta=0) {
    offset(delta = delta)
        text(txt, size = ${tamanhoFonte}, font = "Liberation Sans:style=Bold", spacing = ${1 + espacoChars / 10});
}

module letra_caixa(txt) {
    difference() {
        // 1. Corpo Externo
        linear_extrude(height = ${espessuraBase + espessuraLetra})
            word_outline(txt, delta = ${larguraBorda});
        
        // 2. Cavidade Interna
        translate([0, 0, ${espessuraBase}])
            linear_extrude(height = ${espessuraLetra + 5})
                word_outline(txt, delta = -${larguraDegrau});
                    
        // 3. Rebaixo da Tampa
        translate([0, 0, ${espessuraBase + espessuraLetra - espessuraTampa}])
            linear_extrude(height = ${espessuraTampa + 0.5})
                word_outline(txt, delta = 0);
    }
}

module letra_tampa(txt) {
    linear_extrude(height = ${espessuraTampa})
        word_outline(txt, delta = -${tolerancia});
}

if ("${parteExibir}" == "Borda") {
    letra_caixa("${escapedPalavra}");
    translate([0, 0, ${espessuraBase + espessuraLetra + 10}]) letra_tampa("${escapedPalavra}");
} else if ("${parteExibir}" == "Letra") {
    letra_tampa("${escapedPalavra}");
} else {
    union() {
        letra_caixa("${escapedPalavra}");
        translate([0, 0, ${espessuraBase + espessuraLetra - espessuraTampa}]) color("skyblue") letra_tampa("${escapedPalavra}");
    }
}
`;

        // 2. Queue & Generation Logic
        await generatorSemaphore.acquire();
        console.log(`[Queue] Processing generation for hash: ${hash}`);

        try {
            const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'openscad-'));
            const scadFile = path.join(tempDir, 'model.scad');
            const stlFile = path.join(tempDir, 'model.stl');

            await fs.writeFile(scadFile, scadContent);

            const command = `${OPENSCAD_PATH} -o "${stlFile}" "${scadFile}"`;
            await execAsync(command);

            const stlBuffer = await fs.readFile(stlFile);

            // Save to Cache
            await fs.writeFile(cachedPath, stlBuffer);

            await fs.rm(tempDir, { recursive: true, force: true });

            return new NextResponse(stlBuffer, {
                headers: {
                    'Content-Type': 'model/stl',
                    'Content-Disposition': `attachment; filename="letra_caixa_${palavra}.stl"`,
                    'X-Cache': 'MISS'
                },
            });
        } finally {
            generatorSemaphore.release();
        }

    } catch (error: any) {
        console.error('OpenSCAD Generation Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
