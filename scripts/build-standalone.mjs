import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const clientDir = join(root, "dist", "client");
const outputFile = join(root, "deliverables", "冰河赏金营-暑期营销方案.html");

const html = await readFile(join(clientDir, "index.html"), "utf8");
const cssPath = html.match(/href="\\.\\/assets\\/([^"]+\\.css)"/)?.[1];
const jsPath = html.match(/src="\\.\\/assets\\/([^"]+\\.js)"/)?.[1];

if (!cssPath || !jsPath) {
  throw new Error("Could not locate the built CSS or JavaScript bundle.");
}

let css = await readFile(join(clientDir, "assets", cssPath), "utf8");
let js = await readFile(join(clientDir, "assets", jsPath), "utf8");

for (const filename of ["hero-ice-city.webp", "challenge-arena.webp", "conversion-journey.webp"]) {
  const file = await readFile(join(clientDir, "assets", filename));
  const dataUrl = `data:image/webp;base64,${file.toString("base64")}`;
  css = css.replaceAll(`./${filename}`, dataUrl).replaceAll(`assets/${filename}`, dataUrl);
  js = js.replaceAll(`./assets/${filename}`, dataUrl).replaceAll(`assets/${filename}`, dataUrl);
}

const standalone = html
  .replace(/\\s*<script type="module" crossorigin src="\\.\\/assets\\/[^"]+"><\\/script>/, "")
  .replace(/\\s*<link rel="stylesheet" crossorigin href="\\.\\/assets\\/[^"]+">/, "")
  .replace("</head>", `<style>${css}</style></head>`)
  .replace("</body>", `<script type="module">${js}</script></body>`);

await mkdir(dirname(outputFile), { recursive: true });
await writeFile(outputFile, standalone);
console.log(`Standalone HTML created: ${basename(outputFile)}`);
