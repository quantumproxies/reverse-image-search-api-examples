# Google Lens (reverse image) API — examples

Visual matches for a public image URL — where an image appears across the web.

**Live page, full schema & pricing → [quanticdata.io/collectors/reverse-image-search-api/](https://quanticdata.io/collectors/reverse-image-search-api/)**

Reverse-searches a publicly reachable image URL with Google Lens and delivers each visual match: title, the page it lives on, source site, domain, image/thumbnail URLs. With exact_matches the collector reads the "pages using this exact image" tab instead, which adds the publish date and pixel size per entry — the mode used for brand protection and image-rights checks.

## Quick start (curl)

```bash
curl -X POST https://api.quanticdata.io/v1/scraper/collectors/google_lens/run \
  -H "Authorization: Bearer $QD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Colosseo_2020.jpg/960px-Colosseo_2020.jpg", "max_results": 20}'
```

## Python

See [`example.py`](example.py):

```bash
export QD_API_KEY=qd_live_...   # https://quanticdata.io/
python3 example.py
```

## Inputs

- `image_url` (string, required) — Publicly reachable http(s) image URL to reverse-search.
- `exact_matches` (boolean) — Return pages using this exact image (adds date + pixel size).
- `country` (string) — ISO 3166-1 alpha-2 code — proxy exit geo and Google locale (gl). Omit for the default pool.
- `lang` (string) — Interface language (hl), e.g. en, it, de.
- `max_results` (integer) — How many matches to deliver at most (1–40). You pay only for delivered matches.

## Output — one row per match

| field | type | description |
|---|---|---|
| `rank` | integer | 1-based position. |
| `title` | string | Match title. |
| `link` | string | Page the matching image lives on. |
| `source` | string | Site name shown on the card. |
| `domain` | string | Registrable host of the source page. |
| `image` | string | Full-size image URL when exposed. |
| `thumbnail` | string | Google-hosted thumbnail. |
| `date` | string | Exact-matches only: publish date shown. |
| `size` | string | Exact-matches only: pixel size shown ("426x320"). |
| `exact_match` | boolean | Whether the exact-matches tab was read. |

## Pricing

**$0.002 per delivered match** ($2 per 1,000). A run that delivers nothing costs nothing, and failed rows are never billed. The $2/month free allowance covers roughly 1,000 matchs — no card required.

## Links

- This collector: https://quanticdata.io/collectors/reverse-image-search-api/
- All collectors: https://quanticdata.io/collectors/
- Docs: https://quanticdata.io/docs/
