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
};
