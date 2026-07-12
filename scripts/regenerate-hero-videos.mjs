import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { unlinkSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const ffmpeg = require("@ffmpeg-installer/ffmpeg").path;
const root = process.cwd();
const src = path.join(root, "public/videos/ice-source.mp4");

function run(args) {
  execFileSync(ffmpeg, args, { stdio: "inherit" });
}

run([
  "-y",
  "-i",
  src,
  "-c:v",
  "libx264",
  "-profile:v",
  "high",
  "-pix_fmt",
  "yuv420p",
  "-crf",
  "16",
  "-preset",
  "slow",
  "-vf",
  "scale=1920:-2:flags=lanczos",
  "-an",
  "-movflags",
  "+faststart",
  path.join(root, "public/videos/intro-desktop.mp4"),
]);

run([
  "-y",
  "-i",
  src,
  "-c:v",
  "libx264",
  "-profile:v",
  "high",
  "-pix_fmt",
  "yuv420p",
  "-crf",
  "17",
  "-preset",
  "slow",
  "-vf",
  "scale=1080:-2:flags=lanczos",
  "-an",
  "-movflags",
  "+faststart",
  path.join(root, "public/videos/intro-mobile.mp4"),
]);

try {
  unlinkSync(path.join(root, "public/videos/intro.mp4"));
} catch {
  // already removed
}

run([
  "-y",
  "-ss",
  "0",
  "-i",
  src,
  "-frames:v",
  "1",
  "-q:v",
  "1",
  path.join(root, "public/images/hero-poster.jpg"),
]);

run([
  "-y",
  "-i",
  path.join(root, "public/images/hero-poster.jpg"),
  "-c:v",
  "libwebp",
  "-quality",
  "95",
  path.join(root, "public/images/hero-poster.webp"),
]);

console.log("Hero videos and poster regenerated.");
