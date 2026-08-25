"""Minimal Google Lens (reverse image) API call — one typed row per match.

Docs & schema: https://quanticdata.io/collectors/reverse-image-search-api/
"""
import json
import os

import requests

API = "https://api.quanticdata.io/v1/scraper/collectors/google_lens/run"
KEY = os.environ["QD_API_KEY"]  # https://quanticdata.io/

payload = {
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Colosseo_2020.jpg/960px-Colosseo_2020.jpg",
        "max_results": 20
    }

r = requests.post(
    API,
    headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"},
    json=payload,
    timeout=180,
)
r.raise_for_status()
data = r.json()["payload"]

for row in data["results"]:
    print(row.get("title"), row.get("link"), row.get("source"))
print(f"{len(data['results'])} matchs, cost ${data['cost']}")
