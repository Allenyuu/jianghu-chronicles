import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const [dataSource, appSource, html] = await Promise.all([
  readFile(resolve(root, "data.js"), "utf8"),
  readFile(resolve(root, "app.js"), "utf8"),
  readFile(resolve(root, "index.html"), "utf8")
]);

const context = { window: {} };
vm.runInNewContext(dataSource, context, { filename: "data.js" });
const data = context.window.JIANGHU_DATA;

assert.ok(data, "game data should be exposed");
assert.equal(data.sects.length, 8, "the game should contain eight sects");
assert.equal(data.styles.length, 7, "the game should contain seven martial paths");
assert.equal(data.encounters.length, 12, "the main scene deck should contain twelve reusable scenes");
assert.equal(Object.keys(data.bosses).length, 3, "the campaign should contain three boss chapters");
assert.ok(data.sects.every((sect) => sect.techniques.length === 4), "each sect should contain four techniques");
assert.ok(data.encounters.every((scene) => scene.choices.length === 3), "each scene should offer three approaches");

const techniques = [
  ...data.universalTechniques,
  ...data.styles.map((style) => style.technique),
  ...data.sects.flatMap((sect) => sect.techniques)
];
assert.equal(techniques.length, 42, "the archive should contain forty-two techniques");
assert.equal(new Set(techniques.map((technique) => technique.id)).size, techniques.length, "technique IDs should be unique");

for (const id of ["home-sect-grid", "creator-content", "stage-content", "archive-content", "hook-output", "save-dialog"]) {
  assert.ok(html.includes(`id="${id}"`), `index.html should include #${id}`);
}
assert.ok(html.indexOf("data.js") < html.indexOf("app.js"), "data should load before the app");
assert.ok(!/\son[a-z]+\s*=/.test(html), "HTML should not contain inline event handlers");
assert.ok(appSource.includes("localStorage"), "the game should persist progress locally");
assert.ok(appSource.includes("rollCheck"), "the game should include the yin-yang check engine");

console.log("✓ 8 sects · 7 paths · 42 techniques");
console.log("✓ 12 scenes · 3 boss chapters · 3 approaches per scene");
console.log("✓ required UI roots, persistence, and roll engine present");
