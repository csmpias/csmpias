import json

with open("/home/user/csmp_ias/scripts/post-covers.json", encoding="utf-8") as f:
    covers = json.load(f)

lines = []
for slug, info in covers.items():
    lines.append(
        f"update posts set cover_image_url = $q${info['secure_url']}$q$, "
        f"cover_image_public_id = $q${info['public_id']}$q$ where slug = $q${slug}$q$;"
    )

with open("/home/user/csmp_ias/scripts/update-post-covers.sql", "w", encoding="utf-8") as out:
    out.write("\n".join(lines) + "\n")

print(f"{len(lines)} update statements written")
