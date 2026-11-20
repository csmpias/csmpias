import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { YouTubeIcon } from "@/components/ui/icons";
import { T } from "@/components/layout/t";
import { siteConfig } from "@/lib/site-config";

type YouTubeVideo = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  watchUrl: string;
};

// Curated selection (picked by the institute), not the channel's most-recent
// uploads — deduped from the URLs supplied.
const CURATED_VIDEO_IDS = [
  "Z_HfMEKVRnI",
  "1s_3R-YaBhk",
  "ponsrHVDjTo",
  "BRT8XlWwNpQ",
  "lfEHhfYBgrg",
  "AdmEeiv_GgQ",
];

async function getVideo(videoId: string): Promise<YouTubeVideo | null> {
  try {
    // Public oEmbed endpoint, no API key needed. Cached for an hour so the
    // free-tier deployment doesn't re-fetch YouTube on every homepage visit.
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${videoId}`,
    )}&format=json`;
    const res = await fetch(oembedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { title?: string; thumbnail_url?: string };
    if (!data.title || !data.thumbnail_url) return null;
    return {
      videoId,
      title: data.title,
      thumbnailUrl: data.thumbnail_url,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  } catch {
    return null;
  }
}

async function getCuratedVideos(): Promise<YouTubeVideo[]> {
  const videos = await Promise.all(CURATED_VIDEO_IDS.map(getVideo));
  return videos.filter((video): video is YouTubeVideo => video !== null);
}

export async function YouTubeFeed() {
  const videos = await getCuratedVideos();
  if (videos.length === 0) return null;

  return (
    <div>
      <Reveal>
        <span className="inline-block font-body text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-brand">
          <T k="home.onYoutube" />
        </span>
        <h2 className="mt-2 font-display text-[1.5rem] font-extrabold leading-tight text-heading sm:text-[1.75rem]">
          <T k="home.videoGallery" />
        </h2>
      </Reveal>
      <Reveal as="div" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <a
            key={video.videoId}
            href={video.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Card variant="brand" className="h-full bg-white">
              <div className="relative aspect-video w-full overflow-hidden bg-cream-2">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-11 items-center justify-center rounded-full bg-ink/60 text-white transition-colors group-hover:bg-brand">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 size-5">
                      <path d="M8 5v14l11-7Z" />
                    </svg>
                  </span>
                </span>
              </div>
              <CardBody className="p-4">
                <h3 className="line-clamp-2 font-display text-[0.9375rem] font-bold leading-snug text-heading transition-colors group-hover:text-brand">
                  {video.title}
                </h3>
              </CardBody>
            </Card>
          </a>
        ))}
      </Reveal>
      <div className="mt-6">
        <Button href={siteConfig.social.youtube} variant="outline" target="_blank" rel="noopener noreferrer">
          <YouTubeIcon className="size-5" />
          <T k="cta.subscribeYoutube" />
        </Button>
      </div>
    </div>
  );
}
