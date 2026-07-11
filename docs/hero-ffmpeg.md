# Comandos ffmpeg — Assets del Hero

Fuente: `public/videos/ice-source.mp4` (original ~7s, 2560×1440)

## Desktop (~1.8 Mbps, 1920px)

```bash
ffmpeg -y -i public/videos/ice-source.mp4 \
  -c:v libx264 -profile:v main -pix_fmt yuv420p \
  -b:v 1800k -maxrate 2000k -bufsize 4000k \
  -vf "scale=1920:-2" -an -movflags +faststart \
  public/videos/intro-desktop.mp4
```

## Mobile (~800 kbps, 720px)

```bash
ffmpeg -y -i public/videos/ice-source.mp4 \
  -c:v libx264 -profile:v main -pix_fmt yuv420p \
  -b:v 800k -maxrate 900k -bufsize 1800k \
  -vf "scale=720:-2" -an -movflags +faststart \
  public/videos/intro-mobile.mp4
```

## Fallback principal

```bash
cp public/videos/intro-desktop.mp4 public/videos/intro.mp4
```

## Poster (último frame — logo iluminado)

```bash
ffmpeg -y -sseof -0.05 -i public/videos/ice-source.mp4 \
  -frames:v 1 -update 1 -q:v 2 public/images/hero-poster.jpg

ffmpeg -y -i public/images/hero-poster.jpg \
  -c:v libwebp -quality 85 public/images/hero-poster.webp
```

## Windows (PowerShell)

Sustituye `$ff` por la ruta a `ffmpeg.exe` si no está en PATH:

```powershell
$ff = "ffmpeg"
$src = "public/videos/ice-source.mp4"
& $ff -y -i $src -c:v libx264 -profile:v main -pix_fmt yuv420p -b:v 1800k -maxrate 2000k -bufsize 4000k -vf "scale=1920:-2" -an -movflags +faststart public/videos/intro-desktop.mp4
& $ff -y -i $src -c:v libx264 -profile:v main -pix_fmt yuv420p -b:v 800k -maxrate 900k -bufsize 1800k -vf "scale=720:-2" -an -movflags +faststart public/videos/intro-mobile.mp4
& $ff -y -sseof -0.05 -i $src -frames:v 1 -update 1 -q:v 2 public/images/hero-poster.jpg
& $ff -y -i public/images/hero-poster.jpg -c:v libwebp -quality 85 public/images/hero-poster.webp
```
