export type knotsData = {
  areas: knotsArea[];
  days: string[];
  max_zoom: number;
  min_zoom: number;
  lat_init: number;
  lon_init: number;
  zoom_init: number;
  info: string;
  slides: string[];
};

export type knotsArea = {
  id: string;
  name: string;
  species: knotsSpecie[];
};

export type knotsSpecie = {
  id: string;
  name: string;
  id_layer: string;
  precision: string;
  zoom: number;
  lon: number;
  lat: number;
};

export type knotsEl = {
  id: string;
  name: string;
};

export type markerValues = {
  lng: number;
  lat: number;
  active: boolean;
  value: number;
};

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
  GRAY = "gray",
}

export enum MapStyle {
  DARK = "mapbox://styles/mapbox/dark-v10",
  LIGHT = "mapbox://styles/mapbox/streets-v11",
  GRAY = "mapbox://styles/mapbox/light-v10",
}
