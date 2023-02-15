export type Markers = {
  latLng: number[];
  icon?: string;
  iconSize?: {
    width: number;
    height: number;
  };
  disabled?: boolean;
  title?: string;
};

export type Zoom = number;

export type TileOptions = {
  tileSize?: number;
  opacity?: number;
  updateWhenIdle?: boolean;
  updateWhenZooming?: boolean;
  updateInterval?: number;
  zIndex?: number;
  bounds?: [number[]];
  noWrap?: boolean;
  pane?: string;
  className?: string;
  keepBuffer?: number;
  detectRetina?: boolean;
};

export type Layers = {
  src: string;
  name: string;
  tileOptions?: TileOptions;
};

export type GeoJsonFeatures = {
  type: string;
  properties?: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: any[];
  };
};

export type GeoJson = {
  type: string;
  features: GeoJsonFeatures[];
};
