import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";

const compId = process.env.COMP ?? "369app0611";
const outputLocation = path.resolve(process.env.OUT ?? "out/369app0611-raw.mp4");

console.log(`🚀 Iniciando renderização programática da composição: ${compId}`);
console.log(`📦 Gerando bundle com @remotion/bundler...`);

const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  rspack: true,
});
console.log(`✓ Bundle pronto com Rspack: ${serveUrl}`);

const port = Number(process.env.PORT ?? 3128);
const chromiumOptions = { gl: "angle" };

console.log(`🔍 Obtendo composição no Chromium...`);
const comps = await getCompositions(serveUrl, { port, chromiumOptions });
const composition = comps.find((c) => c.id === compId);

if (!composition) {
  throw new Error(`Composição ${compId} não encontrada! Disponíveis: ${comps.map(c => c.id).join(', ')}`);
}

console.log(`🎬 Composição encontrada: ${composition.id} (${composition.durationInFrames} frames, ${composition.fps} fps)`);
console.log(`📹 Renderizando para: ${outputLocation} (concurrency: 2, crf: 17, disableSharedMemoryCapture: true, x264 threads: 1)...`);

if (fs.existsSync(outputLocation)) {
  fs.unlinkSync(outputLocation);
}

let lastReport = 0;
await renderMedia({
  serveUrl,
  composition,
  codec: "h264",
  crf: 17,
  outputLocation,
  overwrite: true,
  concurrency: 2,
  disableSharedMemoryCapture: true,
  timeoutInMilliseconds: 600000,
  port,
  chromiumOptions,
  ffmpegOverride: ({ type, args }) => {
    const newArgs = [...args];
    const idx = newArgs.indexOf("-c:v");
    if (idx !== -1) {
      newArgs.splice(idx + 2, 0, "-threads", "1", "-x264-params", "threads=1:lookahead-threads=1");
    }
    return newArgs;
  },
  onProgress: ({ renderedFrames, totalFrames }) => {
    const pct = Math.floor((renderedFrames / totalFrames) * 100);
    if (pct >= lastReport + 5 || renderedFrames === totalFrames) {
      lastReport = pct;
      console.log(`  [Progress] ${renderedFrames}/${totalFrames} frames (${pct}%)`);
    }
  }
});

console.log(`🎉 Renderização concluída com sucesso: ${outputLocation}`);
