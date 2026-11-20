import json
import re

with open("/home/user/csmp_ias/content.md", encoding="utf-8") as f:
    lines = f.readlines()

start = next(i for i, l in enumerate(lines) if l.strip() == "### Pages")
end = next(i for i, l in enumerate(lines) if l.strip() == "### Blog Posts")

result = {}
current = None
for line in lines[start + 1:end]:
    line = line.rstrip("\n")
    m = re.match(r"^- `([^`]+)`$", line)
    if m:
        current = m.group(1)
        result[current] = []
        continue
    m2 = re.match(r"^\s+- `([^`]+)`", line)
    if m2 and current:
        result[current].append(m2.group(1))

with open("/home/user/csmp_ias/scripts/pages-image-map.json", "w", encoding="utf-8") as out:
    json.dump(result, out, indent=2, ensure_ascii=False)

print(json.dumps(result, indent=2, ensure_ascii=False))
