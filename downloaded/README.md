# Instruction

1. Download routes, stops stopsintrips from link in their .py files
2. Merge 1 day from new: routes, stopsintrips
3. Replace stops
4. Run `jq -c . < routes.json >> out.json` on every file to minify it
5. Run compress_downloaded.py
6. Remove downloaded json files
7. Run .py files for stops, routes, trips
