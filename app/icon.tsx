import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 48x48 (not 32x32): Google Search's favicon guidelines require the icon
// be a multiple of 48px — https://developers.google.com/search/docs/appearance/favicon-in-search
// — a smaller icon risks Google not picking it up at all for search results.
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

// Same circular treatment as the header's logo mark (see site-header.tsx):
// the source JPG has a black background and isn't square, so it's clipped
// into a circle with object-contain rather than cropped/cover, keeping the
// whole logo visible with no letterboxing against the black frame.
export default async function Icon() {
  const logoData = await readFile(join(process.cwd(), "public", "csmp-ias-logo.jpg"));
  const logoSrc = `data:image/jpeg;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={size.width} height={size.height} style={{ objectFit: "contain" }} />
      </div>
    ),
    { ...size },
  );
}
