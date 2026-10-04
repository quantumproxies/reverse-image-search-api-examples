// Reverse image search API: one typed row per match.
//
//   export QD_API_KEY=...        # https://app.quanticdata.io/register
//   node example.mjs https://www.gstatic.com/webp/gallery/1.jpg
//
// Node 18+, no dependencies.
// Docs and schema: https://quanticdata.io/collectors/reverse-image-search-api/

const BASE = "https://api.quanticdata.io/v1";
const KEY = process.env.QD_API_KEY;
if (!KEY) {
  console.error("Set QD_API_KEY first: https://app.quanticdata.io/register");
  process.exit(1);
}
const headers = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };

const [imageUrl = "https://www.gstatic.com/webp/gallery/1.jpg"] = process.argv.slice(2);
const input = { image_url: imageUrl, max_results: 20 };

const res = await fetch(`${BASE}/scraper/collectors/google_lens/run`, {
  method: "POST",
  headers,
  body: JSON.stringify(input),
});
const body = await res.json();
if (!res.ok || body.type === "error") {
  console.error(`Request failed (${res.status}): ${body.message}`);
  process.exit(1);
}
let run = body.payload;

// Long runs answer 202 and finish in the background: poll the run until it is done.
while (run.status === "queued" || run.status === "running") {
  await new Promise((r) => setTimeout(r, 3000));
  const s = await fetch(`${BASE}/scraper/collectors/runs/${run.run_id}`, { headers });
  run = (await s.json()).payload;
}

const rows = run.results ?? [];
console.table(rows.map((m) => ({
  rank: m.rank,
  domain: m.domain,
  title: (m.title ?? "").slice(0, 60),
  link: m.link,
})));
console.log(`${rows.length} match rows`);
