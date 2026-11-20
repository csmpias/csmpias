import { Document, Page, View, Text, Image, Link, StyleSheet } from "@react-pdf/renderer";
import { FONT_LATIN, FONT_DEVANAGARI } from "./fonts";
import { splitByScript } from "./split-script";
import type { PdfNode, PdfTextRun } from "./parse-html-to-nodes";

const COLORS = {
  heading: "#221638",
  muted: "#454545",
  teal: "#517e70",
  brand: "#e0313c",
  rule: "#d8d3c6",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 80,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontFamily: FONT_LATIN,
    fontSize: 10.5,
    color: COLORS.muted,
  },
  header: {
    position: "absolute",
    top: 24,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottom: `1pt solid ${COLORS.rule}`,
  },
  headerBrand: { fontSize: 11, fontWeight: "bold", color: COLORS.heading },
  headerUrl: { fontSize: 7.5, color: COLORS.muted, marginTop: 2 },
  logo: { width: 32, height: 32, borderRadius: 5 },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTop: `1pt solid ${COLORS.rule}`,
    fontSize: 7.5,
    color: COLORS.muted,
  },
  title: { fontSize: 19, fontWeight: "bold", color: COLORS.heading, marginBottom: 6, lineHeight: 1.3 },
  meta: { fontSize: 8.5, color: COLORS.teal, marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 },
  coverImage: { width: "100%", marginBottom: 16, borderRadius: 6 },
  heading2: { fontSize: 14, fontWeight: "bold", color: COLORS.heading, marginTop: 16, marginBottom: 8 },
  heading3: { fontSize: 12, fontWeight: "bold", color: COLORS.heading, marginTop: 12, marginBottom: 6 },
  paragraph: { fontSize: 10.5, lineHeight: 1.7, marginBottom: 8, color: COLORS.muted },
  blockquote: { borderLeft: `2pt solid ${COLORS.teal}`, paddingLeft: 10, marginBottom: 8, color: COLORS.heading },
  list: { marginBottom: 8 },
  listItem: { flexDirection: "row", marginBottom: 4 },
  bullet: { width: 14, fontSize: 10.5, color: COLORS.teal },
  listItemText: { flex: 1, fontSize: 10.5, lineHeight: 1.6 },
  bodyImage: { width: "100%", marginVertical: 10, borderRadius: 6 },
});

function RunText({ run }: { run: PdfTextRun }) {
  const segments = splitByScript(run.text);
  const spans = segments.map((seg, i) => (
    <Text
      key={i}
      style={{ fontFamily: seg.devanagari ? FONT_DEVANAGARI : FONT_LATIN, fontWeight: run.bold ? "bold" : "normal" }}
    >
      {seg.text}
    </Text>
  ));
  if (run.link) {
    return (
      <Link src={run.link} style={{ color: COLORS.brand, textDecoration: "underline" }}>
        {spans}
      </Link>
    );
  }
  return <>{spans}</>;
}

function Runs({ runs }: { runs: PdfTextRun[] }) {
  return (
    <>
      {runs.map((run, i) => (
        <RunText key={i} run={run} />
      ))}
    </>
  );
}

function PdfBody({ nodes }: { nodes: PdfNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        switch (node.type) {
          case "heading":
            return (
              <Text key={i} style={node.level === 2 ? styles.heading2 : styles.heading3}>
                <Runs runs={node.runs} />
              </Text>
            );
          case "paragraph":
            return (
              <Text key={i} style={styles.paragraph}>
                <Runs runs={node.runs} />
              </Text>
            );
          case "blockquote":
            return (
              <View key={i} style={styles.blockquote}>
                <Text>
                  <Runs runs={node.runs} />
                </Text>
              </View>
            );
          case "list":
            return (
              <View key={i} style={styles.list}>
                {node.items.map((item, j) => (
                  <View key={j} style={styles.listItem} wrap={false}>
                    <Text style={styles.bullet}>{node.ordered ? `${j + 1}.` : "•"}</Text>
                    <Text style={styles.listItemText}>
                      <Runs runs={item} />
                    </Text>
                  </View>
                ))}
              </View>
            );
          case "image":
            return <Image key={i} src={node.src} style={styles.bodyImage} />;
          default:
            return null;
        }
      })}
    </>
  );
}

export function PostPdfDocument({
  title,
  metaLine,
  coverImageSrc,
  nodes,
  logoSrc,
  siteUrl,
}: {
  title: string;
  metaLine: string;
  coverImageSrc?: string;
  nodes: PdfNode[];
  logoSrc: { data: Buffer; format: "jpg" };
  siteUrl: string;
}) {
  return (
    <Document title={title} author="CSMP IAS">
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} fixed>
          <View>
            <Text style={styles.headerBrand}>CSMP IAS</Text>
            <Text style={styles.headerUrl}>{siteUrl}</Text>
          </View>
          <Image src={logoSrc} style={styles.logo} />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>{metaLine}</Text>
        {coverImageSrc ? <Image src={coverImageSrc} style={styles.coverImage} /> : null}

        <PdfBody nodes={nodes} />

        <View style={styles.footer} fixed>
          <Text>{siteUrl}</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
