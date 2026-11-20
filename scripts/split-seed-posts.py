import re

with open("/home/user/csmp_ias/scripts/seed-posts.sql", "r", encoding="utf-8") as f:
    text = f.read()

header = "insert into posts (slug, title, excerpt, content, category, status, seo_title, seo_description, published_at) values\n"
start = text.index(header) + len(header)
end = text.index("\non conflict (slug) do nothing;")
body = text[start:end]

# Each tuple starts a line with exactly "  ('"
indices = [m.start() for m in re.finditer(r"^  \(", body, re.MULTILINE)]
indices.append(len(body))

tuples = []
for i in range(len(indices) - 1):
    chunk = body[indices[i]:indices[i + 1]]
    chunk = chunk.rstrip()
    if chunk.endswith(","):
        chunk = chunk[:-1]
    tuples.append(chunk)

print(f"Parsed {len(tuples)} tuples")

CHUNK_SIZE = 5
n_chunks = (len(tuples) + CHUNK_SIZE - 1) // CHUNK_SIZE

for c in range(n_chunks):
    part = tuples[c * CHUNK_SIZE : (c + 1) * CHUNK_SIZE]
    out = (
        "insert into posts (slug, title, excerpt, content, category, status, seo_title, seo_description, published_at) values\n"
        + ",\n".join(part)
        + "\non conflict (slug) do nothing;\n"
    )
    path = f"/home/user/csmp_ias/scripts/tmp/seed-posts-part-{c:02d}.sql"
    with open(path, "w", encoding="utf-8") as out_f:
        out_f.write(out)
    print(path, len(out.encode("utf-8")), "bytes")
