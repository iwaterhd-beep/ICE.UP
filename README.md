# ICE UP! — Web completa

Marca de ropa de lujo artesanal · **El Chico de Hielo**

Stack: Next.js 16 · TypeScript · Tailwind CSS 4 · Framer Motion · Medusa.js · Zustand

## Arrancar en local

```bash
cd iceup2
npm install
npm run dev
```

Abre http://localhost:3000

## Dependencias principales

| Paquete | Versión |
|---------|---------|
| next | 16.2.10 |
| react | 19.2.4 |
| framer-motion | ^12.42 |
| @medusajs/js-sdk | ^2.17 |
| zustand | ^5.0 |
| tailwindcss | ^4 |

## Variables de entorno

Copia `.env.local.example` → `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Sin Medusa, la tienda funciona en **modo demo** con 4 productos locales.

## Medusa (backend e-commerce)

### 1. PostgreSQL

Opción Docker:

```bash
docker run -d --name iceup-postgres \
  -e POSTGRES_USER=medusa \
  -e POSTGRES_PASSWORD=medusa \
  -e POSTGRES_DB=medusa \
  -p 5432:5432 postgres:16
```

### 2. Crear backend

```bash
cd ..
npx create-medusa-app@latest iceup-medusa
# DATABASE_URL=postgres://medusa:medusa@localhost:5432/medusa
```

### 3. Stripe

```bash
cd iceup-medusa
npm install @medusajs/payment-stripe
```

Configura el provider en `medusa-config.ts` y añade `STRIPE_API_KEY` al `.env` del backend.

### 4. Publishable key

Medusa Admin → Settings → Publishable API Keys → crea una key y ponla en el frontend.

## Assets de vídeo (Hero)

Ver `docs/hero-ffmpeg.md` para regenerar `intro-desktop.mp4`, `intro-mobile.mp4` y posters.

## Despliegue

| Servicio | Plataforma |
|----------|------------|
| Frontend | **Vercel** — conectar repo, `NEXT_PUBLIC_*` en env |
| Medusa | **Railway** o **Render** |
| PostgreSQL | Railway / Render / Supabase |

Build: `npm run build` · Start: `npm run start`

## Estructura

```
app/           → páginas (/, /coleccion, /producto/[handle], /checkout)
components/    → hero, archive, atelier, shop, layout
lib/medusa/    → SDK, productos, carrito
stores/        → cart-store (Zustand)
public/        → vídeos, imágenes, archive, atelier
```

## Checklist QA

- [ ] Hero: vídeo ~7s, congela en último frame, CTA tras `ended`
- [ ] Hero: scroll parallax tras finalizar vídeo
- [ ] Archivo: filtros, modal teclado (←/→/Esc), grayscale→color
- [ ] Atelier: scrollytelling 4 fases en desktop
- [ ] Tienda: grid, variantes, carrito drawer
- [ ] Checkout: formulario demo o Medusa+Stripe
- [ ] Chrome / Safari / mobile
- [ ] `prefers-reduced-motion`: salta al frame final
- [ ] Lighthouse: imágenes lazy, vídeo optimizado mobile/desktop

## Licencia

Proyecto privado — ICE UP!
