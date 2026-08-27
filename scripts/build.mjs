import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");

if (!output.startsWith(`${root}\\`) && !output.startsWith(`${root}/`)) {
  throw new Error("Refusing to build outside the project directory.");
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of ["index.html", "styles.css", "data.js", "app.js", "og.png"]) {
  await copyFile(join(root, file), join(output, file));
}

await writeFile(join(output, ".nojekyll"), "", "utf8");
console.log("Built Jianghu Chronicles → dist/");
