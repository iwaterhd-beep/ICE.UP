# Comandos ffmpeg — Assets del Hero

Fuente: `public/videos/ice-source.mp4` (2560×1440, ~15 Mbps, 7s)

## Estrategia de calidad

| Asset | Uso | Detalle |
|-------|-----|---------|
| `ice-source.mp4` | Desktop | **Sin re-codificar** — resolución y bitrate nativos |
| `intro-mobile.mp4` | Móvil | 1080p, CRF 17, preset slow |
| `hero-poster.jpg` | Poster | Último frame, `-q:v 1` |

## Desktop (usa el master directamente)

No re-codificar. En `lib/constants/hero.ts`:

```ts
desktop: "/videos/ice-source.mp4"
```

## Mobile (1080p alta calidad)

```bash
ffmpeg -y -i public/videos/ice-source.mp4 \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 17 -preset slow \
  -vf "scale=1080:-2:flags=lanczos" \
  -an -movflags +faststart \
  public/videos/intro-mobile.mp4
```

## Poster (último frame — logo iluminado)

```bash
ffmpeg -y -sseof -0.05 -i public/videos/ice-source.mp4 \
  -frames:v 1 -update 1 -q:v 1 public/images/hero-poster.jpg

ffmpeg -y -i public/images/hero-poster.jpg \
  -c:v libwebp -quality 95 public/images/hero-poster.webp
```

## Regenerar todo (npm)

```bash
npm run videos:hero
```

## Windows (PowerShell)

```powershell
$ff = node -e "console.log(require('@ffmpeg-installer/ffmpeg').path)"
$src = "public/videos/ice-source.mp4"
& $ff -y -i $src -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 17 -preset slow -vf "scale=1080:-2:flags=lanczos" -an -movflags +faststart public/videos/intro-mobile.mp4
& $ff -y -sseof -0.05 -i $src -frames:v 1 -update 1 -q:v 1 public/images/hero-poster.jpg
& $ff -y -i public/images/hero-poster.jpg -c:v libwebp -quality 95 public/images/hero-poster.webp
```
