# Portafolio · KBGR55

[![CI / CD Pipeline](https://github.com/KBGR55/KBGR55.github.io/actions/workflows/main.yml/badge.svg)](https://github.com/KBGR55/KBGR55.github.io/actions/workflows/main.yml)
[![Deploy](https://img.shields.io/github/deployments/KBGR55/KBGR55.github.io/github-pages?label=github-pages)](https://kbgr55.github.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](#licencia)

Portafolio personal bilingüe (ES/EN) construido con **LitElement**, **Vite** y **Web Components**. Tema morado/negro, animaciones, terminal interactiva y pipeline CI/CD con escaneo de seguridad y rendimiento.

**Live demo:** [kbgr55.github.io](https://kbgr55.github.io)

---

## Características

- Bilingüe ES/EN con cambio de idioma en caliente.
- Web Components nativos con LitElement (sin framework pesado).
- Tema morado/negro con animaciones, *code rain*, snippets flotantes y *git log terminal*.
- Terminal interactiva integrada en el hero.
- Responsive y optimizado para GitHub Pages.
- CI/CD completo: build, Docker, DAST scan y deploy.

## Stack

| Capa | Tecnología |
|------|------------|
| UI | LitElement, lit-html, Web Components |
| Build | Vite |
| Estilos | CSS modular por componente |
| Contenedor | Docker (Node 20-alpine) |
| CI/CD | GitHub Actions |
| Seguridad | Nikto (DAST) |
| Rendimiento | Apache Benchmark |
| Hosting | GitHub Pages |

## Inicio rápido

```bash
# 1. Clonar
git clone https://github.com/KBGR55/KBGR55.github.io.git
cd KBGR55.github.io

# 2. Instalar dependencias
npm install

# 3. Servidor de desarrollo (http://localhost:5173)
npm start

# 4. Build de producción
npm run build

# 5. Previsualizar build
npm run preview
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo con Vite |
| `npm run build` | Build de producción optimizado |
| `npm run preview` | Sirve el build localmente |
| `npm run format` | Formatea `src/**/*.js` con Prettier |
| `npm run lint` | Verifica formato con Prettier |

## Estructura

```
.
├── .github/workflows/   # CI/CD: build, docker, dast, deploy, scan
├── public/              # Assets estáticos (favicon, imágenes, robots.txt)
├── src/
│   ├── components/      # Web Components (hero, about, projects, etc.)
│   ├── styles/          # CSS compartido (animaciones, botones, secciones)
│   ├── app-root.js      # Componente raíz
│   ├── i18n.js          # Traducciones ES/EN
│   ├── icons.js         # Iconos SVG
│   └── index.js         # Entry point
├── Dockerfile
├── vite.config.js
└── index.html
```

## CI/CD

El pipeline `main.yml` orquesta cuatro etapas en cadena:

1. **Build** — instala dependencias y genera el bundle de producción.
2. **Docker** — construye y publica la imagen del portafolio.
3. **DAST Scan** — Nikto escanea la imagen en busca de vulnerabilidades web.
4. **Deploy** — publica el sitio en GitHub Pages.

Workflows complementarios:
- `scan.yml` — análisis estático y de dependencias.
- `dast.yml` — escaneo dinámico con Nikto.

## Docker

```bash
docker build -t kbgr55-portafolio .
docker run -p 3000:3000 kbgr55-portafolio
# http://localhost:3000
```

## Licencia

MIT © [KBGR55](https://github.com/KBGR55)
