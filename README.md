# Gaia-GIS

Gaia-GIS is an Angular-based geospatial visualization library that enables developers to add interactive map elements like points, polygons, and raster layers to their applications. This library leverages Leaflet and includes optional Bootstrap styling for easy map integration and customization.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Features](#features)
  - [Adding a Point](#adding-a-point)
  - [Adding a Polygon](#adding-a-polygon)
  - [Adding a Raster Layer](#adding-a-raster-layer)
- [Usage Examples](#usage-examples)
  - [Basic Map Component](#basic-map-component)
- [Development](#development)
- [Contribution](#contribution)
- [License](#license)

## Installation

To install Gaia-GIS, run:

```bash
npm install gaia-gis
```
## Setup
After installing, import Gaia-GIS into your Angular project.

**Add Gaia-GIS styles:**
- 1.Add the necessary CSS files in angular.json:

```bash
"styles": [
  "node_modules/leaflet/dist/leaflet.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "src/styles.css"
]
```
- 2.Import Gaia-GIS in the App Module:

```bash
import { GaiaGisModule } from 'gaia-gis';

@NgModule({
  imports: [
    GaiaGisModule,
    // other imports...
  ]
})
export class AppModule {}

```
## Features
**Adding a Point**
To add a point on the map, use the addPoint method. You can customize the latitude, longitude, and title of the point

```bash
<button (click)="openFormPopup()" class="btn btn-secondary">Add Point</button>
```
**Adding a Polygon**
Add polygons by defining a set of coordinates and a color. Use the addPolygon method to add the polygon to your map.
```bash
<button (click)="openPolygonPopup()" class="btn btn-secondary">Add Polygon</button>
```

**Adding a Raster Layer**
Raster layers are added using the addRaster method. Specify a URL for the raster source, and optionally apply a color filter.

```bash
<button (click)="openRasterForm()" class="btn btn-secondary">Add Raster Layer</button>
```