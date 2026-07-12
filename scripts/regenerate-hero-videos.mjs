import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const ffmpeg = require("@ffmpeg-installer/ffmpeg").path;
const root = process.cwd();

function run(args) {
  execFileSync(ffmpeg, args, { stdio: "inherit" });
}

const brandSrc = path.join(root, "public/videos/ice-brand-source.mp4");
const cinematicSrc = path.join(root, "public/videos/ice-cinematic-source.mp4");

/** Vídeo vertical del cliente (~92s) */
run([
  "-y", "-i", brandSrc,
  "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p",
  "-crf", "23", "-preset", "slow", "-vf", "scale=720:-2:flags=lanczos",
  "-c:a", "aac", "-b:a", "128k", "-ac", "2", "-movflags", "+faststart",
  path.join(root, "public/videos/intro-brand-desktop.mp4"),
]);

run([
  "-y", "-i", brandSrc,
  "-c:v", "libx264", "-profile:v", "main", "-pix_fmt", "yuv420p",
  "-crf", "24", "-preset", "slow", "-vf", "scale=576:-2:flags=lanczos",
  "-c:a", "aac", "-b:a", "128k", "-ac", "2", "-movflags", "+faststart",
  path.join(root, "public/videos/intro-brand-mobile.mp4"),
]);

/** Vídeo cinematic tienda 3D (~7s) */
run([
  "-y", "-i", cinematicSrc,
  "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
  "-crf", "16", "-preset", "slow", "-vf", "scale=1920:-2:flags=lanczos",
  "-c:a", "aac", "-b:a", "128k", "-ac", "2", "-movflags", "+faststart",
  path.join(root, "public/videos/intro-cinematic-desktop.mp4"),
]);

run([
  "-y", "-i", cinematicSrc,
  "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
  "-crf", "17", "-preset", "slow", "-vf", "scale=1080:-2:flags=lanczos",
  "-c:a", "aac", "-b:a", "128k", "-ac", "2", "-movflags", "+faststart",
  path.join(root, "public/videos/intro-cinematic-mobile.mp4"),
]);

run([
  "-y", "-ss", "5", "-i", brandSrc,
  "-frames:v", "1", "-update", "1", "-q:v", "2",
  path.join(root, "public/images/hero-poster-brand.jpg"),
]);

run([
  "-y", "-ss", "0", "-i", cinematicSrc,
  "-frames:v", "1", "-update", "1", "-q:v", "1",
  path.join(root, "public/images/hero-poster-cinematic.jpg"),
]);

for (const [input, output] of [
  ["hero-poster-brand.jpg", "hero-poster-brand.webp"],
  ["hero-poster-cinematic.jpg", "hero-poster-cinematic.webp"],
]) {
  run([
    "-y", "-i", path.join(root, "public/images", input),
    "-c:v", "libwebp", "-quality", "88",
    path.join(root, "public/images", output),
  ]);
}

console.log("Brand + cinematic hero videos and posters regenerated.");
