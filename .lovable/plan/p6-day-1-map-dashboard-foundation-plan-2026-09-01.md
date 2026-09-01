# P6 Day 1 — Map Dashboard Foundation (Plan)

## Current state (inspection results)
- **Stack already present:** React 19, TanStack Start (Vite-based full-stack React framework), TanStack Router, TanStack Query, Tailwind CSS v4, shadcn-style component setup, TypeScript, ESLint, Prettier, bun.
- **Entry point:** `src/routes/index.tsx` is a blank placeholder — this becomes the map dashboard.
- **`.gitignore`:** exists and already covers `node_modules`, build output, and `.env` files.
- **Missing:** MapLibre GL JS, Deck.gl, any map code, `.env.example`.

## Recommended architecture

```text
src/
  routes/
    index.tsx                  → Map dashboard page (replaces placeholder)
  components/
    map/
      MapView.tsx              → MapLibre map + Deck.gl overlay wiring (client-only)
      LayerPanel.tsx           → Toggle each layer on/off
      MapLegend.tsx            → Layer legend
  lib/
    map/
      config.ts                → Basemap style, initial view state (browser-safe)
      types.ts                 → Shared layer/data types
      layers/
        index.ts               → buildLayers() returns the 4 deck.gl layers
        sarRasterLayer.ts      → BitmapLayer placeholder (synthetic SAR tile)
        slickPolygonLayer.ts   → GeoJsonLayer placeholder polygon
        h3CorridorLayer.ts     → H3HexagonLayer placeholder corridor
        aisTracksLayer.ts      → PathLayer + ScatterplotLayer placeholder tracks
      data/
        sampleData.ts          → Synthetic placeholder GeoJSON/coords for all layers
  styles.css                   → design tokens for the dashboard (dark map theme)
```

Why this structure: `components/map/` = rendering only; `lib/map/layers/` = one file per data layer so teammates (other Ps) can swap placeholders for real data without touching UI; `lib/map/data/` isolates sample data.

**SSR note (important):** MapLibre/Deck.gl are browser-only. `MapView` will be lazy-loaded via `React.lazy` behind `<ClientOnly>` so the server render never touches them. Shared config/types stay in a browser-safe module.

## Commands to run
```bash
bun add maplibre-gl @deck.gl/core @deck.gl/layers @deck.gl/geo-layers @deck.gl/mapbox @deck.gl-community/layers h3-js
```
(no `.gitignore` changes needed; add `.env.example` file only)

## What gets built (Day 1 scope only)
1. Map dashboard at `/`: full-screen MapLibre basemap (free CARTO dark style — no API key needed) with a Deck.gl `MapboxOverlay` (interleaved mode).
2. Left side panel with toggle switches for the 4 layers + a legend.
3. Placeholder layers with synthetic data:
   - **SAR raster** → `BitmapLayer` with a small procedurally generated grayscale "SAR-like" image patch
   - **Slick polygon** → `GeoJsonLayer` filled polygon (sample coordinates)
   - **H3 corridor** → `H3HexagonLayer` from `h3-js` generated corridor hexes
   - **AIS tracks** → `PathLayer` vessel tracks + `ScatterplotLayer` position pings
4. `.env.example` documenting `VITE_MAP_STYLE_URL` (optional override of basemap style).
5. Head metadata (title/description) for the dashboard route.
6. Design system: dark maritime theme tokens in `src/styles.css` used by the panel/legend.

## Explicitly out of scope (per "do NOT build the entire application")
- No backend, database, or API integration
- No real data pipelines — all placeholder data is synthetic
- No time-slider/playback, no auth, no extra pages
