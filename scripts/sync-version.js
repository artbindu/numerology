const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const packageJsonPath = path.join(rootDir, "package.json");
const indexHtmlPath = path.join(rootDir, "public", "index.html");

const { version } = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const html = fs.readFileSync(indexHtmlPath, "utf8");
if (!/<span id="app-version" class="side-about-value">[^<]*<\/span>/.test(html)) {
  throw new Error("Unable to find the app version span in public/index.html.");
}

const nextHtml = html.replace(
  /(<span id="app-version" class="side-about-value">)([^<]*)(<\/span>)/,
  `$1${version}$3`
);

fs.writeFileSync(indexHtmlPath, nextHtml);