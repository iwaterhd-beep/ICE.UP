import { HERO_VIDEOS } from "@/lib/constants/hero";

export function HeroVideoPreload() {
  return (
    <>
      <link
        rel="preload"
        href={HERO_VIDEOS.desktop}
        as="video"
        type="video/mp4"
        media="(min-width: 769px)"
      />
      <link
        rel="preload"
        href={HERO_VIDEOS.mobile}
        as="video"
        type="video/mp4"
        media="(max-width: 768px)"
      />
    </>
  );
}
