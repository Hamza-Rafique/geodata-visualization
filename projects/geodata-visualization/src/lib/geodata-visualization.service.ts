import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class GeodataVisualizationService {
  private layers: L.Layer[] = [];
  private map: L.Map | undefined;
  private polygons: L.Polygon[] = [];
  private activeLayers: { [key: string]: any } = {};
  constructor() {}

  initializeMap(elementId: string, options?: L.MapOptions): void {
    if (this.map) {
      this.map.remove(); // Remove any existing map instance
    }

    const defaultOptions: L.MapOptions = {
      center: [0, 0],
      zoom: 2,
      ...options,
    };

    this.map = L.map(elementId, defaultOptions);
    // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

    // Set default political map as the base layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="">Artimisa</a> contributors',
    }).addTo(this.map);
  }

  switchToPhysicalMap(): void {
    if (!this.map) return;
    this.map.eachLayer((layer) => layer.remove()); // Clear current layers
    L.tileLayer(
      'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
      {
        maxZoom: 18,
        attribution:
          'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
      }
    ).addTo(this.map);
  }

  addPoint(lat: number, lng: number, options?: L.MarkerOptions): void {
    if (!this.map) return;
    L.marker([lat, lng], options).addTo(this.map);
  }

  addPolygon(
    coordinates: [number, number][],
    options: { color: string }
  ): L.Polygon {
    const polygon = L.polygon(coordinates, { color: options.color });
    polygon.addTo(this.map!);
    this.polygons.push(polygon);
    return polygon;
  }
  // Method to retrieve the last added polygon
  getLastPolygon(): L.Polygon | null {
    return this.polygons.length > 0
      ? this.polygons[this.polygons.length - 1]
      : null;
  }
  addRaster(url: string, colorFilter?: string): void {
    if (!this.map) return;
    const rasterLayer = L.tileLayer(url, { opacity: 0.7 }); // Customize opacity
    const container = rasterLayer.getContainer();
    if (colorFilter && container) {
      container.style.filter = colorFilter;
    }
    rasterLayer.addTo(this.map);
  }
  setLayerColor(layer: L.Layer, color: string): void {
    if (layer instanceof L.Polygon || layer instanceof L.CircleMarker) {
      layer.setStyle({ color });
    }
  }

  addLayer(map: L.Map, layer: L.Layer): void {
    this.layers.push(layer);
    layer.addTo(map);
  }

  toggleLayerVisibility(map: L.Map, layer: L.Layer, visible: boolean): void {
    visible ? layer.addTo(map) : map.removeLayer(layer);
  }
  activateLayer(type: string, layer: L.Layer) {
    if (!this.activeLayers[type]) {
      this.activeLayers[type] = layer;
      layer.addTo(this.map!);
    }
  }

  deactivateLayer(type: string) {
    const layer = this.activeLayers[type];
    if (layer) {
      layer.remove();
      delete this.activeLayers[type];
    }
  }
  setLayerOpacity(type: string, opacity: number): void {
    const layer = this.activeLayers[type];
    if (layer) {
      if (layer instanceof L.Polygon || layer instanceof L.CircleMarker) {
        layer.setStyle({ opacity }); 
      } else if (layer instanceof L.TileLayer) {
        layer.setOpacity(opacity);
      }
    }
  }
}
