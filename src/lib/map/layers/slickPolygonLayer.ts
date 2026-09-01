import { GeoJsonLayer } from "@deck.gl/layers";
import type { Feature, Polygon } from "geojson";

import { LAYER_IDS } from "../config";
import { SLICK_POLYGONS } from "../data/sampleData";

/** Placeholder oil-slick extent polygons. */
export function createSlickPolygonLayer(visible: boolean) {
  const features: Feature<Polygon>[] = SLICK_POLYGONS.map((slick) => ({
    type: "Feature",
    properties: { id: slick.id, confidence: slick.confidence },
    geometry: { type: "Polygon", coordinates: [slick.ring] },
  }));

  return new GeoJsonLayer({
    id: LAYER_IDS.slickPolygon,
    visible,
    data: { type: "FeatureCollection", features },
    filled: true,
    stroked: true,
    getFillColor: [245, 158, 11, 70],
    getLineColor: [245, 158, 11, 220],
    getLineWidth: 2,
    lineWidthUnits: "pixels",
    pickable: true,
  });
}
