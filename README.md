# React Native Leaflet TS

Please show your support by adding a star! :)

react-native-leaflet-ts is a library with Typescript support that let's you to render a Leaflet in a WebView.

NOTE! Library is new, this will be updated & more stuff will be added.

[![npm](https://img.shields.io/npm/v/react-native-leaflet-ts.svg)](https://www.npmjs.com/package/react-native-leaflet-ts)
[![npm](https://img.shields.io/npm/dm/react-native-leaflet-ts.svg)](https://www.npmjs.com/package/react-native-leaflet-ts)
[![npm](https://img.shields.io/npm/dt/react-native-leaflet-ts.svg)](https://www.npmjs.com/package/react-native-leaflet-ts)

## Installation

Npm

```bash
npm install react-native-leaflet-ts
```

Yarn

```bash
yarn add react-native-leaflet-ts
```

## Usage

```javascript
import Leaflet from 'react-native-leaflet-ts';
```

## Usage with props

```javascript
import Leaflet, { Markers, TileOptions } from 'react-native-leaflet-ts';
```

## Release log

- [2023-02-15][v0.2.16] - Added multiple layers & geoJSON
- [2022-12-01][v0.2.12] - Fixed webview dependency
- [2022-10-17][v0.2.9] - Added prop for detecting retina-screens
- [2022-10-17][v0.2.8] - Fixed loading issue for iOS
- [2022-10-11][v0.2.6] - Fixed support for Android
- [2022-10-06][v0.2.1] - Fixed path for custom icon.
- [2022-10-06][v0.2.0] - Minor changes to readme-file.
- [2022-10-04][v0.1.8] - Support for custom icons & increased performance.
- [2022-10-04][v0.1.7] - Added webview to peerDependencies.
- [2022-10-04][v0.1.6] - Added dependencies to peerDependencies to prevent useRef crash.

## API Reference

#### Leaflet

| Parameter             | Type                                | Default     | Status       | Description                       |
| :-------------------- | :---------------------------------- | :---------- | :----------- | :-------------------------------- |
| `mapLayers`           | `Layers[]`                          |             | **Required** | 1 or more layers is needed        |
| `zoom`                | `number`                            | 0           | **Optional** |                                   |
| `maxZoom`             | `number`                            |             | **Optional** |                                   |
| `minZoom`             | `number`                            |             | **Optional** |                                   |
| `flyTo`               | `{ latLng: number[], zoom number }` |             | **Optional** | Flies to a specific marker        |
| `startInLoadingState` | `boolean`                           | true        | **Optional** | Map starts in loading state       |
| `backgroundColor`     | `string`                            | transparent | **Optional** | BackgroundColor of map            |
| `onMessage`           | `function`                          |             | **Optional** | (event: any) => void;             |
| `onError`             | `function`                          |             | **Optional** | (event: any) => void              |
| `onLoadStart`         | `function`                          |             | **Optional** | When webview loads starts loading |

#### mapLayers

| Parameter     | Type          | Default | Status       | Description                                       |
| :------------ | :------------ | :------ | :----------- | :------------------------------------------------ |
| `name`        | `string`      |         | **Required** | Name of the map, mostly useful if multiple layers |
| `src`         | `string`      |         | **Required** | Source of the map                                 |
| `tileOptions` | `TileOptions` |         | **Optional** |                                                   |

Example usage:

```javascript
const options: TileOptions = {
  noWrap: true,
  detectRetina: true,
};

const mapLayers: Layers[] = [
  {
    name: 'Floor 1',
    src: 'https://cdn.myIndoorMap.com/maps/0faebe50-19e5-4445-9177-a09903973304/rev0/{z}/{x}/{-y}.png',
    tileOptions: options,
  },
  {
    name: 'Floor 2',
    src: 'https://cdn.myIndoorMap.com/maps/71b328d0-d85a-43a9-87ca-bf7c145d145b/rev0/{z}/{x}/{-y}.png',
    tileOptions: options,
  },
];
```

#### TileOptions

`https://leafletjs.com/reference.html#tilelayer`

| Parameter           | Type         | Default | Status       | Description                               |
| :------------------ | :----------- | :------ | :----------- | :---------------------------------------- |
| `tileSize`          | `number`     | 256     | **Optional** | Width and height of the tails in the grid |
| `opacity`           | `number`     | 1       | **Optional** | Opacity of the map                        |
| `updateWhenIdle`    | `boolean`    |         | **Optional** | Load new tiles only when panning ends     |
| `updateWhenZooming` | `boolean`    | true    | **Optional** | Zoom animation                            |
| `updateInterval`    | `number`     | 200     | **Optional** | Tile update speed                         |
| `zIndex`            | `number`     | 1       | **Optional** | zIndex of tile                            |
| `bounds`            | `[number[]]` |         | **Optional** |                                           |
| `noWrap`            | `boolean`    | false   | **Optional** | If map should be repeated                 |
| `pane`              | `string`     |         | **Optional** |                                           |
| `className`         | `string`     |         | **Optional** |                                           |
| `keepBuffer`        | `number`     | 2       | **Optional** |                                           |
| `detectRetina`      | `boolean`    | false   | **Optional** |                                           |

#### Markers

| Parameter  | Type                               | Default | Status       | Description                                |
| :--------- | :--------------------------------- | :------ | :----------- | :----------------------------------------- |
| `latLng`   | `number[]`                         |         | **Required** | Position of the marker on the map          |
| `icon`     | `string`                           |         | **Optional** | example: "src/assets/pin.png"              |
| `iconSize` | `{ width: number, height: number}` |         | **Optional** | size of icon                               |
| `disabled` | `boolean`                          | false   | **Optional** | Weather it's clickable or not              |
| `title`    | `string`                           | ""      | **Optional** | Text in textbox after clicking on a marker |

#### GeoJSON

| Parameter  | Type                | Default | Status       | Description |
| :--------- | :------------------ | :------ | :----------- | :---------- |
| `type`     | `string`            |         | **Required** |             |
| `features` | `GeoJsonFeatures[]` |         | **Required** |             |

#### GeoJsonFeatures

| Parameter    | Type                                   | Default | Status       | Description |
| :----------- | :------------------------------------- | :------ | :----------- | :---------- |
| `type`       | `string`                               |         | **Required** |             |
| `geometry`   | `{ type: string, coordinates: any[] }` |         | **Required** |             |
| `properties` | `{ name: string }`                     |         | **Optional** |             |

## Examples

```javascript
const markerList: Markers[] = [
  {
    latLng: [-38.31571580761326, -23.735463483398522],
    iconSize: {
      width: 25,
      height: 25,
    },
    icon: './src/assets/mapPin.png',
    title: 'Title 1',
    disabled: true,
  },
  {
    latLng: [-58.31571543253336, -43.535453281293517],
    iconSize: {
      width: 25,
      height: 25,
    },
    title: 'Title 2',
  },
];

const options: TileOptions = {
  noWrap: true,
  detectRetina: true,
};

const mapLayers: Layers[] = [
  {
    name: 'Floor 1',
    src: 'https://cdn.myIndoorMap.com/maps/0faebe50-19e5-4445-9177-a09903973304/rev0/{z}/{x}/{-y}.png',
    tileOptions: options,
  },
  {
    name: 'Floor 2',
    src: 'https://cdn.myIndoorMap.com/maps/71b328d0-d85a-43a9-87ca-bf7c145d145b/rev0/{z}/{x}/{-y}.png',
    tileOptions: options,
  },
];
```

```javascript
<Leaflet
  mapLayers={mapLayers}
  minZoom={1}
  zoom={2}
  maxZoom={6}
  flyTo={{
    latLng: [-38.31571580761326, -23.735463483398522],
    zoom: 5,
  }}
  markers={markerList}
  backgroundColor="green"
/>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Links

[We App](https://www.weapp.se/)
[GitHub](https://github.com/putteabrahamsson/react-native-leaflet-ts)

## Help / Info

If you need any of the other Leaflet properties just let me know and I'll add them in.
Send me a mail at patrick@weapp.se.
