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

## Medusa + Railway + Vercel

Arquitectura recomendada:

| Servicio | Plataforma | Repo |
|----------|------------|------|
| Frontend (iceup2) | **Vercel** | `ICE.UP` |
| Backend Medusa | **Railway** | `medusa/` en este repo |
| PostgreSQL | Railway | (add-on) |
| Redis | Railway | (add-on) |

### 1. Railway — backend Medusa

1. Crea repo en GitHub con la carpeta `iceup-medusa` y conéctalo a Railway.
2. En el proyecto Railway, añade **PostgreSQL** y **Redis**.
3. Crea un servicio desde el repo y usa el `Dockerfile` incluido.
4. Variables (ver `medusa/.env.railway.example`):
   - `DATABASE_URL=${{Postgres.DATABASE_PUBLIC_URL}}`
   - `REDIS_URL=${{Redis.REDIS_PUBLIC_URL}}?family=0`
   - `JWT_SECRET` y `COOKIE_SECRET` (genera con `openssl rand -hex 32`)
   - `MEDUSA_BACKEND_URL` = dominio público de Railway
   - `STORE_CORS` = URL de Vercel + `http://localhost:3000`
   - `AUTH_CORS` = Vercel + backend + localhost
5. **Generate Domain** en Railway → copia la URL.
6. Admin: `https://tu-backend.up.railway.app/app`
7. Settings → **Publishable API Keys** → crea key para el frontend.

### 2. Vercel — frontend

En el proyecto `ICE.UP`, añade variables de entorno:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://tu-backend.up.railway.app
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
```

Redeploy en Vercel tras guardar.

### 3. Medusa (backend e-commerce) — local

```bash
cd medusa/apps/backend
npm run dev
```

Sin Medusa en producción, la tienda funciona en **modo demo** con productos locales.

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
