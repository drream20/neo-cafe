/* Temporary builder: splices the pricing content into pricing/pricing.html.
   Asserts every anchor first; writes only if all checks pass. */
const fs = require("fs");

const page = "pricing/pricing.html";
const contentFile = "pricing/_content.tmp";
let html = fs.readFileSync(page, "utf8");
const raw = fs.readFileSync(contentFile, "utf8");

const parts = {};
["HEAD", "GRID", "SECTIONS"].forEach((k, i, arr) => {
  const start = raw.indexOf("<!--SPLIT:" + k + "-->");
  const next = arr[i + 1] ? raw.indexOf("<!--SPLIT:" + arr[i + 1] + "-->") : raw.length;
  if (start === -1 || next === -1 || next <= start) throw new Error("marker missing: " + k);
  parts[k] = raw
    .slice(start + ("<!--SPLIT:" + k + "-->").length, next)
    .replace(/^\s*\n/, "")
    .replace(/\s+$/, "");
});

const HEAD = parts.HEAD;
const GRID = parts.GRID;
const SECTIONS = parts.SECTIONS;

const hOld =
  '            <div class="flex items-center justify-between">\n' +
  '              <h1 class="text-base font-semibold text-white">My Projects</h1>\n' +
  "            </div>";

const gridMark = "            <!-- Projects -- responsive grid -->";
const gridOpen = '            <div class="mt-3 grid gap-3 sm:grid-cols-2">';
const gridClose = "            </div>";
const footMark = "        <!-- FOOTER -->";

/* ---------- pre-flight assertions ---------- */
const problems = [];
if (!HEAD.length) problems.push("HEAD content empty");
if (!GRID.length) problems.push("GRID content empty");
if (!SECTIONS.length) problems.push("SECTIONS content empty");
if (html.indexOf(hOld) === -1) problems.push("header block anchor not found");
if (html.indexOf(gridMark) === -1) problems.push("grid comment anchor not found");
if (html.indexOf(gridOpen) === -1) problems.push("grid open anchor not found");
if (html.indexOf(footMark) === -1) problems.push("footer anchor not found");
for (let n = 1; n <= 5; n++) {
  if (html.indexOf("<!-- Project " + n + " -->") === -1) problems.push("article " + n + " anchor missing");
}
if ((html.match(/<\/article>/g) || []).length !== 5) problems.push("expected 5 </article> before the splice");
if ((html.match(/view-mobile-btn/g) || []).length !== 5) problems.push("expected 5 view-mobile-btn in the markup");
if (problems.length) {
  console.log("ABORTED — anchors not as expected:");
  problems.forEach((p) => console.log("  - " + p));
  process.exit(1);
}

/* ---------- splice ---------- */
const hIdx = html.indexOf(hOld);
html = html.slice(0, hIdx) + HEAD + "\n\n" + html.slice(hIdx + hOld.length);

const gi = html.indexOf(gridMark);
const gOpenIdx = html.indexOf(gridOpen, gi);
const gCloseIdx = html.indexOf(gridClose, gOpenIdx);
html = html.slice(0, gi) + GRID + html.slice(gCloseIdx + gridClose.length);

const fIdx = html.indexOf(footMark);
html = html.slice(0, fIdx) + SECTIONS + "\n\n" + html.slice(fIdx);

/* ---------- post-flight assertions ---------- */
const post = [];
if (/<!-- Project \d -->/.test(html)) post.push("article comments left behind");
if (/<article/.test(html)) post.push("<article> left behind");
if (html.indexOf("My Projects") !== -1) post.push('"My Projects" heading still present');
if (html.indexOf("md:grid-cols-3") === -1) post.push("packages grid classes missing");
if (html.indexOf('id="quote"') === -1) post.push("quote anchor missing");
if (html.indexOf("#hi-check") === -1) post.push("check icon not referenced");
if (html.indexOf("#hi-banknotes") === -1) post.push("banknotes icon not referenced");
const sOpen = (html.match(/<section/g) || []).length;
const sClose = (html.match(/<\/section>/g) || []).length;
if (sOpen !== sClose) post.push("unbalanced <section>: " + sOpen + " vs " + sClose);
if (sOpen !== 5) post.push("expected 5 sections, found " + sOpen);
const divOpen = (html.match(/<div\b/g) || []).length;
const divClose = (html.match(/<\/div>/g) || []).length;
if (divOpen !== divClose) post.push("unbalanced <div>: " + divOpen + " vs " + divClose);
const ulOpen = (html.match(/<ul\b/g) || []).length;
const ulClose = (html.match(/<\/ul>/g) || []).length;
if (ulOpen !== ulClose) post.push("unbalanced <ul>: " + ulOpen + " vs " + ulClose);
if (post.length) {
  console.log("ABORTED before writing — post-flight problems:");
  post.forEach((p) => console.log("  - " + p));
  process.exit(1);
}

fs.writeFileSync(page, html, "utf8");
console.log("SPLICED OK");
console.log("  sections: " + sOpen + "  |  divs: " + divOpen + "/" + divClose);
console.log("  packages grid: " + (html.match(/md:grid-cols-3/g) || []).length + " grids");
console.log("  check icons: " + (html.match(/#hi-check/g) || []).length);
console.log("  file size: " + html.length + " bytes");
